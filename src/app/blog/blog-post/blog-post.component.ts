import { Component, OnInit, AfterViewInit, inject, PLATFORM_ID, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SeoService } from '../../services/seo.service';
import { getPostBySlug, BlogPost } from '../posts.registry';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss',
})
export class BlogPostComponent implements OnInit, AfterViewInit {
  private route = inject(ActivatedRoute);
  private seoService = inject(SeoService);
  private sanitizer = inject(DomSanitizer);
  private platformId = inject(PLATFORM_ID);
  private el = inject(ElementRef);

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
    const links = this.el.nativeElement.querySelectorAll('.prose a');
    links.forEach((a: HTMLAnchorElement) => {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
    });
  }

  copyLink(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    navigator.clipboard.writeText(window.location.href).then(() => {
      this.linkCopied = true;
      setTimeout(() => (this.linkCopied = false), 2000);
    });
  }
}
