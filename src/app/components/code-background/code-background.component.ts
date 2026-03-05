import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const CODE_LINES = [
  "import { Component, OnInit } from '@angular/core';",
  "import { FormBuilder, FormGroup, Validators } from '@angular/forms';",
  "import { HttpClient } from '@angular/common/http';",
  "import { Observable } from 'rxjs';",
  "import { map, catchError, tap } from 'rxjs/operators';",
  '',
  '@Component({',
  "  selector: 'app-portfolio',",
  "  templateUrl: './portfolio.component.html',",
  "  styleUrls: ['./portfolio.component.scss']",
  '})',
  'export class PortfolioComponent implements OnInit {',
  '  projects: Project[] = []; contactForm: FormGroup; isLoading = false;',
  '  constructor(',
  '    private http: HttpClient, private fb: FormBuilder',
  '  ) {}',
  '',
  '  ngOnInit(): void {',
  '    this.initForm(); this.loadProjects();',
  '  }',
  '',
  '  initForm(): void {',
  '    this.contactForm = this.fb.group({',
  "      name: ['', [Validators.required, Validators.minLength(2)]],",
  "      email: ['', [Validators.required, Validators.email]],",
  "      message: ['', [Validators.required, Validators.minLength(10)]]",
  '    });',
  '  }',
  '',
  '  loadProjects(): void {',
  '    this.isLoading = true;',
  "    this.getProjects().pipe(",
  '      tap(projects => { this.projects = projects; this.isLoading = false; }),',
  '      catchError(error => { console.error(error); return []; })',
  '    ).subscribe();',
  '  }',
  '',
  '  getProjects(): Observable<Project[]> {',
  "    return this.http.get<Project[]>('/api/projects');",
  '  }',
  '}',
];

@Component({
  selector: 'app-code-background',
  standalone: true,
  template: `<div class="background-text" #bgEl></div>`,
  styleUrl: './code-background.component.scss',
})
export class CodeBackgroundComponent implements OnInit, OnDestroy {
  @ViewChild('bgEl', { static: true }) bgEl!: ElementRef<HTMLDivElement>;

  private platformId = inject(PLATFORM_ID);
  private activeTimeouts: ReturnType<typeof setTimeout>[] = [];
  private resizeTimer: ReturnType<typeof setTimeout> | null = null;
  private resizeHandler?: () => void;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.createCodeGrid();
    this.startTyping();
    this.resizeHandler = () => {
      if (this.resizeTimer) clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        this.clearTimings();
        this.createCodeGrid();
        this.startTyping();
      }, 250);
    };
    window.addEventListener('resize', this.resizeHandler);
  }

  ngOnDestroy(): void {
    this.clearTimings();
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
    if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler);
  }

  private clearTimings(): void {
    this.activeTimeouts.forEach((id) => clearTimeout(id));
    this.activeTimeouts = [];
  }

  private createCodeGrid(): void {
    const el = this.bgEl.nativeElement;
    const lineHeight = 21;
    const approxLines = Math.ceil(window.innerHeight / lineHeight) + 5;
    const approxCols = Math.ceil(window.innerWidth / 800) + 1;

    el.innerHTML = '';

    for (let col = 0; col < approxCols; col++) {
      for (let line = 0; line < approxLines; line++) {
        const div = document.createElement('div');
        div.className = 'code-line';
        div.dataset['line'] = String(line % CODE_LINES.length);
        div.dataset['delay'] = String(line * 100 + col * 2000);
        div.style.marginLeft = `${col * 800}px`;
        el.appendChild(div);
      }
    }
  }

  private startTyping(): void {
    const lines = this.bgEl.nativeElement.querySelectorAll<HTMLDivElement>('.code-line');
    lines.forEach((line) => {
      const index = parseInt(line.dataset['line'] ?? '0', 10);
      const delay = parseInt(line.dataset['delay'] ?? '0', 10);
      const text = CODE_LINES[index];
      const id = setTimeout(() => this.typeText(line, text), delay);
      this.activeTimeouts.push(id);
    });
  }

  private typeText(element: HTMLDivElement, text: string): void {
    let index = 0;
    let current = '';
    const type = () => {
      if (index < text.length) {
        current += text.charAt(index++);
        element.textContent = current;
        const id = setTimeout(type, Math.random() * 50 + 20);
        this.activeTimeouts.push(id);
      } else {
        const id = setTimeout(() => {
          element.textContent = '';
          index = 0;
          current = '';
          type();
        }, 3000);
        this.activeTimeouts.push(id);
      }
    };
    type();
  }
}
