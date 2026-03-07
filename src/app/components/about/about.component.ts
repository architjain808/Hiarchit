import { Component, AfterViewInit, ElementRef, ViewChild, ViewChildren, QueryList, PLATFORM_ID, inject, NgZone, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  // Stacked heading lines
  @ViewChildren('headLine')     headLines!:      QueryList<ElementRef>;
  // "ABOUT ME" label
  @ViewChild('aboutLabel')      aboutLabel!:     ElementRef<HTMLDivElement>;
  // Right visual column (used as main scroll trigger)
  @ViewChild('aboutVisual')     aboutVisual!:    ElementRef<HTMLDivElement>;
  // The tilted photo frame
  @ViewChild('photoFrame')      photoFrame!:     ElementRef<HTMLDivElement>;
  // Name overlay span inside photo
  @ViewChild('overlayName')     overlayName!:    ElementRef<HTMLSpanElement>;
  // Signature image
  @ViewChild('signature')       signature!:      ElementRef<HTMLImageElement>;
  // Floating identity chip
  @ViewChild('chipEl')          chipEl!:         ElementRef<HTMLDivElement>;
  // Bio + education block
  @ViewChild('aboutBody')       aboutBody!:      ElementRef<HTMLDivElement>;
  @ViewChild('eduBlock')        eduBlock!:       ElementRef<HTMLDivElement>;
  // Marquee
  @ViewChild('marqueeContainer') marqueeContainer!: ElementRef<HTMLDivElement>;

  private platformId = inject(PLATFORM_ID);
  private ngZone     = inject(NgZone);
  private ctx!: gsap.Context;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Ensure signature is visible with no animation
        if (this.signature) {
          this.signature.nativeElement.style.clipPath = 'none';
        }
        return;
      }
      gsap.registerPlugin(ScrollTrigger);
      this.initAnimations();
    }
  }

  ngOnDestroy() {
    if (this.ctx) this.ctx.revert();
  }

  private initAnimations() {
    this.ngZone.runOutsideAngular(() => {
      this.ctx = gsap.context(() => {

        // ─── LEFT COLUMN ────────────────────────────────────────────

        const textTrigger = {
          trigger: this.headLines.first?.nativeElement,
          start: 'top 85%',
        };

        // "ABOUT ME" label drops in
        gsap.from(this.aboutLabel.nativeElement, {
          scrollTrigger: textTrigger,
          y: -16,
          opacity: 0,
          duration: 0.6,
          ease: 'power3.out',
        });

        // WHO / AM I. stacked overflow-hidden reveal
        gsap.from(this.headLines.map(el => el.nativeElement), {
          scrollTrigger: textTrigger,
          y: '110%',
          rotate: 3,
          duration: 1.1,
          stagger: 0.15,
          ease: 'power4.out',
          delay: 0.1,
        });

        // Bio paragraph stagger up
        gsap.from(this.aboutBody.nativeElement, {
          scrollTrigger: {
            trigger: this.aboutBody.nativeElement,
            start: 'top 85%',
          },
          y: 32,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        });

        // Education block slides in from left
        gsap.from(this.eduBlock.nativeElement, {
          scrollTrigger: {
            trigger: this.eduBlock.nativeElement,
            start: 'top 90%',
          },
          x: -30,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
        });


        // ─── RIGHT COLUMN ───────────────────────────────────────────

        const visualTrigger = {
          trigger: this.aboutVisual.nativeElement,
          start: 'top 80%',
        };

        // Identity chip pops in with elastic bounce
        gsap.from(this.chipEl.nativeElement, {
          scrollTrigger: visualTrigger,
          scale: 0,
          opacity: 0,
          duration: 0.7,
          ease: 'back.out(2.5)',
          delay: 0.3,
        });

        // Photo frame: enters tilted further, then settles to -2deg
        // The CSS hover will handle straightening to 0deg
        gsap.from(this.photoFrame.nativeElement, {
          scrollTrigger: visualTrigger,
          y: 80,
          rotate: -6,
          opacity: 0,
          duration: 1.4,
          ease: 'power3.out',
        });

        // Name overlay inside image — rises from overflow-hidden clip
        gsap.from(this.overlayName.nativeElement, {
          scrollTrigger: {
            trigger: this.photoFrame.nativeElement,
            start: 'top 70%',
          },
          y: '115%',
          duration: 1,
          ease: 'power4.out',
          delay: 0.5,
        });

        // Signature: clip-path draw-on — sweeps left → right, simulates writing
        gsap.set(this.signature.nativeElement, { clipPath: 'inset(0 100% 0 0)' });
        gsap.to(this.signature.nativeElement, {
          scrollTrigger: {
            trigger: this.photoFrame.nativeElement,
            start: 'top 60%',
          },
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.6,
          ease: 'power2.out',
          delay: 0.6,
        });


        // ─── MARQUEE ─────────────────────────────────────────────────

        if (this.marqueeContainer) {
          const marqueeEls = this.marqueeContainer.nativeElement.querySelectorAll('.skills-marquee');
          gsap.to(marqueeEls, {
            xPercent: -100,
            repeat: -1,
            duration: 22,
            ease: 'linear',
          });
        }

      });
    });
  }
}
