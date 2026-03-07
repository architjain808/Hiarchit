import { Component, OnInit, OnDestroy, ElementRef, ViewChild, PLATFORM_ID, inject, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  templateUrl: './custom-cursor.component.html',
  styleUrl: './custom-cursor.component.scss'
})
export class CustomCursorComponent implements OnInit, OnDestroy {
  @ViewChild('cursor', { static: true }) cursor!: ElementRef<HTMLDivElement>;
  @ViewChild('follower', { static: true }) follower!: ElementRef<HTMLDivElement>;

  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private mouseMoveHandler!: (e: MouseEvent) => void;
  private mouseEnterHandler!: () => void;
  private mouseLeaveHandler!: () => void;
  private isVisible = false;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initCursor();
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('mousemove', this.mouseMoveHandler);
      document.querySelectorAll('a, button, .hoverable').forEach(el => {
        el.removeEventListener('mouseenter', this.mouseEnterHandler);
        el.removeEventListener('mouseleave', this.mouseLeaveHandler);
      });
    }
  }

  private initCursor() {
    this.mouseMoveHandler = (e: MouseEvent) => {
      this.ngZone.runOutsideAngular(() => {
        if (!this.isVisible) {
          gsap.set([this.cursor.nativeElement, this.follower.nativeElement], { opacity: 1 });
          this.isVisible = true;
        }

        // Centering the cursor (width 8px -> offset 4, width 40px -> offset 20)
        gsap.to(this.cursor.nativeElement, {
          x: e.clientX - 4,
          y: e.clientY - 4,
          duration: 0.1,
          ease: 'power2.out'
        });
        gsap.to(this.follower.nativeElement, {
          x: e.clientX - 20,
          y: e.clientY - 20,
          duration: 0.5,
          ease: 'power3.out'
        });
      });
    };

    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('mousemove', this.mouseMoveHandler);

      this.mouseEnterHandler = () => {
        gsap.to(this.follower.nativeElement, {
          scale: 1.5,
          backgroundColor: 'rgba(154, 215, 65, 0.4)',
          duration: 0.3
        });
      };

      this.mouseLeaveHandler = () => {
        gsap.to(this.follower.nativeElement, {
          scale: 1,
          backgroundColor: 'rgba(154, 215, 65, 0.2)',
          duration: 0.3
        });
      };

      // Attach to interactive elements
      setTimeout(() => {
        document.querySelectorAll('a, button, .hoverable').forEach(el => {
          el.addEventListener('mouseenter', this.mouseEnterHandler);
          el.addEventListener('mouseleave', this.mouseLeaveHandler);
        });
      }, 1000); // Give Angular time to render components
    });
  }
}
