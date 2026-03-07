import { Component, AfterViewInit, ElementRef, ViewChild, ViewChildren, QueryList, PLATFORM_ID, inject, NgZone, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('sectionLine1')  sectionLine1!:  ElementRef<HTMLHeadingElement>;
  @ViewChild('sectionLine2')  sectionLine2!:  ElementRef<HTMLHeadingElement>;
  @ViewChild('sectionSubline') sectionSubline!: ElementRef<HTMLParagraphElement>;
  @ViewChildren('projectCard') projectCards!: QueryList<ElementRef>;

  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private ctx!: gsap.Context;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Ensure curtains don't block images for users who skip animations
        document.querySelectorAll('.img-curtain').forEach((el) => {
          (el as HTMLElement).style.display = 'none';
        });
        return;
      }
      gsap.registerPlugin(ScrollTrigger);
      this.initAnimations();
    }
  }

  ngOnDestroy() {
    if (this.ctx) {
      this.ctx.revert();
    }
  }

  private initAnimations() {
    this.ngZone.runOutsideAngular(() => {
      this.ctx = gsap.context(() => {

        // --- Section heading: two-line stacked overflow-hidden reveal ---
        const headingTrigger = {
          trigger: this.sectionLine1.nativeElement,
          start: 'top 85%',
        };

        const tl = gsap.timeline({ scrollTrigger: headingTrigger });

        tl.from(this.sectionLine1.nativeElement, {
          y: '110%',
          rotate: 3,
          duration: 1,
          ease: 'power4.out',
        })
          .from(this.sectionLine2.nativeElement, {
            y: '110%',
            rotate: 3,
            duration: 1,
            ease: 'power4.out',
          }, '-=0.75')
          .from(this.sectionSubline.nativeElement, {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
          }, '-=0.5');


        // --- Per-card animations ---
        this.projectCards.forEach((card) => {
          const imgContainer = card.nativeElement.querySelector('.img-container');
          const curtain       = card.nativeElement.querySelector('.img-curtain');
          const parallaxBg    = card.nativeElement.querySelector('.parallax-bg');
          const infoEls       = [
            card.nativeElement.querySelector('.project-meta'),
            card.nativeElement.querySelector('.project-title'),
            card.nativeElement.querySelector('.project-desc'),
            card.nativeElement.querySelector('.project-tags'),
            card.nativeElement.querySelector('.project-cta'),
          ].filter(Boolean);
          const tags = card.nativeElement.querySelectorAll('.tag');

          // 1. Curtain reveal — green panel slides off upward, exposing the image
          if (curtain && imgContainer) {
            gsap.to(curtain, {
              y: '-101%',
              duration: 1.4,
              ease: 'power4.inOut',
              scrollTrigger: {
                trigger: imgContainer,
                start: 'top 78%',
              }
            });
          }

          // 2. Image container entrance (subtle scale-in after curtain)
          if (imgContainer) {
            gsap.from(imgContainer, {
              scale: 0.94,
              duration: 1.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: imgContainer,
                start: 'top 78%',
              }
            });
          }

          // 3. Info column: sequential stagger entrance
          if (infoEls.length) {
            gsap.from(infoEls, {
              y: 35,
              opacity: 0,
              duration: 0.9,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card.nativeElement,
                start: 'top 78%',
              },
              delay: 0.25
            });
          }

          // 4. Tags pop in individually with elastic bounce
          if (tags.length) {
            gsap.from(tags, {
              scale: 0.7,
              opacity: 0,
              duration: 0.5,
              stagger: 0.08,
              ease: 'back.out(2.5)',
              scrollTrigger: {
                trigger: card.nativeElement,
                start: 'top 78%',
              },
              delay: 0.65
            });
          }

          // 5. Parallax scroll on image background
          if (parallaxBg) {
            gsap.to(parallaxBg, {
              yPercent: 35,
              ease: 'none',
              scrollTrigger: {
                trigger: imgContainer,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
              }
            });
          }
        });

      });
    });
  }
}
