import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  PLATFORM_ID,
  inject,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
  NgZone
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SeoService } from '../../services/seo.service';
import { HeroComponent } from '../hero/hero.component';
import { AboutComponent } from '../about/about.component';
import { ExperienceComponent } from '../experience/experience.component';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, AboutComponent, ExperienceComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('preloader')    preloader!:     ElementRef<HTMLDivElement>;
  @ViewChild('loaderLine')   loaderLine!:    ElementRef<HTMLDivElement>;
  @ViewChild('floatingBtn')  floatingBtn!:   ElementRef<HTMLAnchorElement>;
  @ViewChild('progressRing') progressRing!:  ElementRef<SVGCircleElement>;
  @ViewChildren('loaderChar') loaderChars!:  QueryList<ElementRef>;

  private seoService = inject(SeoService);
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private ctx!: gsap.Context;

  ngOnInit(): void {
    this.seoService.setDefaultSEO();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.playPreloader();
    }
  }

  private playPreloader() {
    this.ngZone.runOutsideAngular(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.preloader.nativeElement.style.display = 'none';
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      this.ctx = gsap.context(() => {
        const chars  = this.loaderChars.map(el => el.nativeElement);
        const line   = this.loaderLine.nativeElement;
        const btnEl  = this.floatingBtn.nativeElement;

        gsap.set(btnEl, { opacity: 0, scale: 0 });

        const tl = gsap.timeline();

        tl
          .to(chars, {
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power4.out',
            delay: 0.2
          })
          .to(line, {
            width: '110px',
            duration: 0.5,
            ease: 'power2.out'
          }, '<0.4')
          .to(line, {
            opacity: 0,
            duration: 0.25,
            ease: 'power1.in'
          }, '+=0.35')
          .to(chars, {
            y: '-100%',
            stagger: 0.05,
            duration: 0.6,
            ease: 'power4.in',
            delay: 0.2
          })
          .to(this.preloader.nativeElement, {
            yPercent: -100,
            duration: 1,
            ease: 'power4.inOut'
          })
          .to(btnEl, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: 'elastic.out(1, 0.6)'
          }, '-=0.4');

        const circumference = 2 * Math.PI * 58;
        const ringEl = this.progressRing.nativeElement;

        gsap.set(ringEl, {
          strokeDasharray: circumference,
          strokeDashoffset: circumference,
        });

        gsap.to(ringEl, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.4,
          },
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
