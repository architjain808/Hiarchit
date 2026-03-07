import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, ViewChildren, QueryList, PLATFORM_ID, inject, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements AfterViewInit, OnDestroy {
  // Name lines — overflow-hidden clip reveal
  @ViewChildren('heroLine')  lineElements!:  QueryList<ElementRef>;
  // Subtitle + mobile stats
  @ViewChildren('heroText')  textElements!:  QueryList<ElementRef>;
  // Topbar items
  @ViewChildren('heroMeta')  metaElements!:  QueryList<ElementRef>;
  // Nav links
  @ViewChildren('navItem')   navElements!:   QueryList<ElementRef>;
  // Desktop stat items
  @ViewChildren('statItem')  statItems!:     QueryList<ElementRef>;
  // Role strip (bars + text)
  @ViewChild('roleStrip')    roleStrip!:     ElementRef<HTMLDivElement>;
  // Desktop visual wrapper
  @ViewChild('heroVisual')   heroVisual!:    ElementRef<HTMLDivElement>;
  // Floating badge — isolated float tween
  @ViewChild('floatingBadge') floatingBadge!: ElementRef<HTMLDivElement>;
  // All interactive shapes (circles, dots, line, badge)
  @ViewChildren('shape')     shapes!:        QueryList<ElementRef>;

  private platformId   = inject(PLATFORM_ID);
  private ngZone       = inject(NgZone);
  private mouseMoveHandler!: (e: MouseEvent) => void;
  private badgeFloatTween?: gsap.core.Tween;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.animateHero(prefersReduced);
      if (!prefersReduced) {
        this.initVisualInteraction();
      }
    }
  }

  private animateHero(prefersReduced: boolean): void {
    if (prefersReduced) {
      // Instantly reveal all elements — no motion
      gsap.set(this.lineElements.map(el => el.nativeElement), { y: 0 });
      gsap.set(this.textElements.map(el => el.nativeElement), { opacity: 1, y: 0 });
      gsap.set(this.metaElements.map(el => el.nativeElement), { opacity: 1 });
      gsap.set(this.navElements.map(el => el.nativeElement), { opacity: 1, y: 0 });
      gsap.set(this.shapes.map(el => el.nativeElement), { scale: 1, opacity: 1 });
      if (this.roleStrip) {
        gsap.set(this.roleStrip.nativeElement.querySelectorAll('.strip-bar'), { scaleX: 1 });
      }
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' },
        onComplete: () => {
          if (this.floatingBadge) {
            this.badgeFloatTween = gsap.to(this.floatingBadge.nativeElement, {
              y: -10,
              duration: 2.8,
              yoyo: true,
              repeat: -1,
              ease: 'sine.inOut'
            });
          }
        }
      });

      // 1. Topbar — drops in from above
      tl.fromTo(
        this.metaElements.map(el => el.nativeElement),
        { y: -24, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out', delay: 0.1 }
      );

      // 2. Name lines rise from behind overflow-hidden clip
      tl.fromTo(
        this.lineElements.map(el => el.nativeElement),
        { y: '110%' },
        { y: '0%', stagger: 0.18, duration: 1.1 },
        '-=0.3'
      );

      // 3. Role strip bars grow outward from center
      if (this.roleStrip) {
        const leftBar  = this.roleStrip.nativeElement.querySelector('.strip-bar--left');
        const rightBar = this.roleStrip.nativeElement.querySelector('.strip-bar--right');
        const text     = this.roleStrip.nativeElement.querySelector('.strip-text');

        tl.fromTo(
          [leftBar, rightBar],
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: 'power3.out' },
          '-=0.7'
        );
        tl.fromTo(
          text,
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          '-=0.6'
        );
      }

      // 4. Subtitle + mobile stats
      tl.fromTo(
        this.textElements.map(el => el.nativeElement),
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: 'power3.out' },
        '-=0.5'
      );

      // 5. Nav links
      tl.fromTo(
        this.navElements.map(el => el.nativeElement),
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out' },
        '-=0.6'
      );

      // 6. Desktop stats — pop in with elastic
      if (this.statItems.length) {
        tl.fromTo(
          this.statItems.map(el => el.nativeElement),
          { y: 20, opacity: 0, scale: 0.85 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.7, ease: 'back.out(2)' },
          '-=0.8'
        );
      }

      // 7. Circles + shapes pop in with elastic bounce
      tl.fromTo(
        this.shapes.map(el => el.nativeElement),
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.08, duration: 1.4, ease: 'elastic.out(1, 0.7)' },
        '-=1'
      );
    });
  }

  private initVisualInteraction() {
    this.mouseMoveHandler = (e: MouseEvent) => {
      this.ngZone.runOutsideAngular(() => {
        const xPos = (e.clientX / window.innerWidth  - 0.5) * 2;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 2;

        this.shapes.forEach((shape, index) => {
          const depth        = (index + 1) * 15;
          const rotateFactor = (index % 2 === 0 ? 1 : -1) * 15;

          gsap.to(shape.nativeElement, {
            x: xPos * depth,
            y: yPos * depth,
            rotateX: -yPos * rotateFactor,
            rotateY:  xPos * rotateFactor,
            duration: 1.5,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        });
      });
    };

    window.addEventListener('mousemove', this.mouseMoveHandler);

    // Slow continuous rotation for ring shapes
    this.ngZone.runOutsideAngular(() => {
      this.shapes.forEach((shape, index) => {
        if (shape.nativeElement.classList.contains('rotate-slow')) {
          const isReverse = shape.nativeElement.classList.contains('reverse');
          gsap.to(shape.nativeElement, {
            rotationZ: isReverse ? -360 : 360,
            duration: 25 + (index * 5),
            repeat: -1,
            ease: 'none'
          });
        }
      });
    });
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId) && this.mouseMoveHandler) {
      window.removeEventListener('mousemove', this.mouseMoveHandler);
    }
    this.badgeFloatTween?.kill();
  }
}
