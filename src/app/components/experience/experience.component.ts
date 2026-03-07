import { Component, AfterViewInit, ElementRef, ViewChild, ViewChildren, QueryList, PLATFORM_ID, inject, NgZone, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-experience',
  standalone: true,
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('headLine')   headLines!:    QueryList<ElementRef>;
  @ViewChild('headSub')       headSub!:      ElementRef<HTMLParagraphElement>;
  @ViewChildren('expItem')    expItems!:     QueryList<ElementRef>;
  @ViewChildren('dividerLine') dividerLines!: QueryList<ElementRef>;

  private platformId = inject(PLATFORM_ID);
  private ngZone     = inject(NgZone);
  private ctx!: gsap.Context;

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Show all elements immediately
        document.querySelectorAll('.exp-accent-line').forEach(el => {
          (el as HTMLElement).style.height = '100%';
        });
        document.querySelectorAll('.exp-divider-line').forEach(el => {
          (el as HTMLElement).style.width = '100%';
        });
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

        // --- Section heading: stacked overflow-hidden reveal ---
        const headingTl = gsap.timeline({
          scrollTrigger: {
            trigger: this.headLines.first?.nativeElement,
            start: 'top 85%',
          }
        });

        headingTl
          .from(this.headLines.map(el => el.nativeElement), {
            y: '110%',
            rotate: 3,
            duration: 1.1,
            stagger: 0.15,
            ease: 'power4.out',
          })
          .from(this.headSub.nativeElement, {
            y: 24,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
          }, '-=0.6');


        // --- Per-card animations ---
        this.expItems.forEach((item) => {
          const el           = item.nativeElement;
          const accentLine   = el.querySelector('.exp-accent-line');
          const topRow       = el.querySelector('.exp-row-top');
          const roleEl       = el.querySelector('.exp-role');
          const companyLink  = el.querySelector('.exp-company-link');
          const achievements = el.querySelectorAll('.exp-achievements li');
          const tags         = el.querySelectorAll('.etag');

          const trigger = { trigger: el, start: 'top 82%' };
          const triggerDeep = { trigger: el, start: 'top 75%' };

          // 1. Left accent bar grows downward
          if (accentLine) {
            gsap.to(accentLine, {
              scrollTrigger: trigger,
              height: '100%',
              duration: 1.4,
              ease: 'power2.out',
            });
          }

          // 2. Index + duration row slides in from left
          if (topRow) {
            gsap.from(topRow, {
              scrollTrigger: trigger,
              x: -30,
              opacity: 0,
              duration: 0.7,
              ease: 'power3.out',
            });
          }

          // 3. Massive role title rises from overflow-hidden clip
          if (roleEl) {
            gsap.from(roleEl, {
              scrollTrigger: trigger,
              y: '105%',
              duration: 1.1,
              ease: 'power4.out',
              delay: 0.08,
            });
          }

          // 4. Company link slides in from the right
          if (companyLink) {
            gsap.from(companyLink, {
              scrollTrigger: trigger,
              x: 24,
              opacity: 0,
              duration: 0.8,
              ease: 'power3.out',
              delay: 0.15,
            });
          }

          // 5. Achievement bullets stagger up
          if (achievements.length) {
            gsap.from(achievements, {
              scrollTrigger: triggerDeep,
              y: 20,
              opacity: 0,
              duration: 0.65,
              stagger: 0.09,
              ease: 'power2.out',
              delay: 0.2,
            });
          }

          // 6. Tags pop in with elastic bounce
          if (tags.length) {
            gsap.from(tags, {
              scrollTrigger: triggerDeep,
              scale: 0.65,
              opacity: 0,
              duration: 0.45,
              stagger: 0.07,
              ease: 'back.out(2.5)',
              delay: 0.45,
            });
          }
        });


        // --- Divider lines sweep left → right ---
        this.dividerLines.forEach(line => {
          gsap.to(line.nativeElement, {
            scrollTrigger: { trigger: line.nativeElement, start: 'top 88%' },
            width: '100%',
            duration: 1.3,
            ease: 'power2.out',
          });
        });

      });
    });
  }
}
