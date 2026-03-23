import { Component, OnInit, AfterViewInit, OnDestroy, inject, PLATFORM_ID, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SeoService } from '../../services/seo.service';
import { getPostBySlug, BlogPost } from '../posts.registry';

const COPY_SVG = `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="13" height="13">
  <rect x="5.5" y="2" width="7.5" height="9.5" rx="1.5" stroke="currentColor" stroke-width="1.4"/>
  <path d="M3.5 4.5H3A1.5 1.5 0 001.5 6v8A1.5 1.5 0 003 15.5h7A1.5 1.5 0 0011.5 14v-1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
</svg>`;

const CHECK_SVG = `<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" width="13" height="13">
  <path d="M2.5 8.5l4 4 7-8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss',
})
export class BlogPostComponent implements OnInit, AfterViewInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private seoService = inject(SeoService);
  private sanitizer = inject(DomSanitizer);
  private platformId = inject(PLATFORM_ID);
  private el = inject(ElementRef);
  private enhanceTimer: ReturnType<typeof setTimeout> | null = null;

  post: BlogPost | undefined;
  safeContent: SafeHtml = '';
  linkCopied = false;

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.post = getPostBySlug(slug);

    if (this.post) {
      this.safeContent = this.sanitizer.bypassSecurityTrustHtml(this.post.content);
      this.seoService.setBlogPostSEO(this.post.title, this.post.excerpt, slug);
    }
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    // Defer past Angular hydration's DOM reconciliation tick, which can
    // re-apply [innerHTML] and wipe dynamically injected wrappers.
    this.enhanceTimer = setTimeout(() => this.enhanceProse(), 0);
  }

  ngOnDestroy(): void {
    if (this.enhanceTimer !== null) clearTimeout(this.enhanceTimer);
  }

  private enhanceProse(): void {
    const prose = this.el.nativeElement.querySelector('.prose');
    if (!prose) return;

    prose.querySelectorAll('a').forEach((a: HTMLAnchorElement) => {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    });

    prose.querySelectorAll('pre').forEach((pre: HTMLPreElement) => {
      // Guard: skip if already wrapped (prevents double-enhance on re-runs)
      if (pre.parentElement?.classList.contains('code-block')) return;
      this.wrapCodeBlock(pre);
    });
  }

  private wrapCodeBlock(pre: HTMLPreElement): void {
    const code = pre.querySelector('code');
    const lang = this.detectLanguage(code);

    const wrapper = document.createElement('div');
    wrapper.className = 'code-block';
    pre.parentNode!.insertBefore(wrapper, pre);
    wrapper.appendChild(pre);

    const header = document.createElement('div');
    header.className = 'code-block-header';

    const left = document.createElement('div');
    left.className = 'cbh-left';
    left.innerHTML = `
      <div class="code-dots">
        <span class="dot-r"></span>
        <span class="dot-y"></span>
        <span class="dot-g"></span>
      </div>
      <span class="code-lang">${lang}</span>
    `;

    const copyBtn = document.createElement('button');
    copyBtn.className = 'code-copy-btn';
    copyBtn.type = 'button';
    copyBtn.setAttribute('aria-label', 'Copy code');
    copyBtn.innerHTML = `${COPY_SVG}<span>Copy</span>`;

    copyBtn.addEventListener('click', () => {
      const text = code?.textContent ?? pre.textContent ?? '';
      navigator.clipboard.writeText(text).then(() => {
        copyBtn.classList.add('copied');
        copyBtn.innerHTML = `${CHECK_SVG}<span>Copied!</span>`;
        setTimeout(() => {
          copyBtn.classList.remove('copied');
          copyBtn.innerHTML = `${COPY_SVG}<span>Copy</span>`;
        }, 2000);
      });
    });

    header.appendChild(left);
    header.appendChild(copyBtn);
    wrapper.insertBefore(header, pre);
  }

  private detectLanguage(code: HTMLElement | null): string {
    if (!code) return 'code';
    const langClass = Array.from(code.classList).find(c => c.startsWith('language-'));
    if (langClass) return langClass.replace('language-', '');

    const text = code.textContent ?? '';
    if (/@Component|@Injectable|ngOnInit|isPlatformBrowser|inject\(|: void|: string/.test(text)) return 'typescript';
    if (/\bimport\b.*from\s+['"]|export\s+(default|const|class|function)/.test(text)) return 'typescript';
    if (/<\w[\w-]*[\s/>]|<\/\w[\w-]*>/.test(text)) return 'html';
    if (/\$[\w-]+\s*:|@mixin|@include|&:\w|sass|scss/.test(text)) return 'scss';
    if (/^\s*(npm|npx|ng|git|node|cd|ls|mkdir)\s/m.test(text)) return 'bash';
    if (/^\s*\{[\s\S]*"[\w-]+":\s/.test(text)) return 'json';
    if (/function\s+\w+|const\s+\w+\s*=|=>\s*[{(]/.test(text)) return 'javascript';
    return 'code';
  }

  copyLink(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    navigator.clipboard.writeText(window.location.href).then(() => {
      this.linkCopied = true;
      setTimeout(() => (this.linkCopied = false), 2000);
    });
  }
}
