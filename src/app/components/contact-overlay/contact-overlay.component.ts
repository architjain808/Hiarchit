import {
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  QueryList,
  ViewChild,
  ViewChildren,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { toObservable } from '@angular/core/rxjs-interop';
import { skip, Subscription } from 'rxjs';
import gsap from 'gsap';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-overlay',
  standalone: true,
  templateUrl: './contact-overlay.component.html',
  styleUrl: './contact-overlay.component.scss',
})
export class ContactOverlayComponent implements OnInit, OnDestroy {
  private platformId   = inject(PLATFORM_ID);
  private ngZone       = inject(NgZone);
  contactService       = inject(ContactService);

  @ViewChild('overlayBackdrop') backdropEl!:  ElementRef<HTMLDivElement>;
  @ViewChild('overlayPanel')    overlayPanel!: ElementRef<HTMLDivElement>;
  @ViewChildren('panelTitle')   titleEls!:     QueryList<ElementRef>;
  @ViewChild('panelStrip')      panelStrip!:   ElementRef<HTMLDivElement>;
  @ViewChildren('socialItem')   socialItems!:  QueryList<ElementRef>;
  @ViewChild('panelFooter')     panelFooter!:  ElementRef<HTMLParagraphElement>;

  private openTl?: gsap.core.Timeline;
  private closeTl?: gsap.core.Timeline;
  private sub!: Subscription;
  private host: HTMLElement;

  // open$ is initialised in constructor (injection context)
  private open$ = toObservable(inject(ContactService).isOpen);

  constructor(elRef: ElementRef) {
    this.host = elRef.nativeElement;
  }

  ngOnInit() {
    // Skip the initial `false` emission; react only to real changes
    this.sub = this.open$.pipe(skip(1)).subscribe(open => {
      if (!isPlatformBrowser(this.platformId)) return;
      if (open) this.animateIn();
      else      this.animateOut();
    });
  }

  close() { this.contactService.close(); }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.contactService.isOpen()) this.close();
  }

  private animateIn() {
    const backdrop = this.backdropEl?.nativeElement;
    const panel    = this.overlayPanel?.nativeElement;
    if (!backdrop || !panel) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.closeTl?.kill();
    document.body.style.overflow = 'hidden';
    this.host.style.pointerEvents = 'auto';

    if (reduced) {
      gsap.set(backdrop, { opacity: 1 });
      gsap.set(panel, { opacity: 1, y: 0, scale: 1 });
      gsap.set(this.panelStrip.nativeElement, { opacity: 1 });
      gsap.set(this.socialItems.map(e => e.nativeElement), { opacity: 1, x: 0 });
      if (this.panelFooter?.nativeElement) gsap.set(this.panelFooter.nativeElement, { opacity: 1 });
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.openTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      this.openTl.fromTo(backdrop,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 }
      );

      this.openTl.fromTo(panel,
        { opacity: 0, y: 48, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power4.out' },
        '-=0.25'
      );

      this.openTl.fromTo(
        this.titleEls.map(e => e.nativeElement),
        { y: '110%' },
        { y: '0%', stagger: 0.1, duration: 0.7 },
        '-=0.35'
      );

      this.openTl.fromTo(
        this.panelStrip.nativeElement,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        '-=0.4'
      );

      this.openTl.fromTo(
        this.socialItems.map(e => e.nativeElement),
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, stagger: 0.07, duration: 0.5, ease: 'power3.out' },
        '-=0.3'
      );

      if (this.panelFooter?.nativeElement) {
        this.openTl.fromTo(
          this.panelFooter.nativeElement,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.4 },
          '-=0.2'
        );
      }
    });
  }

  private animateOut() {
    const backdrop = this.backdropEl?.nativeElement;
    const panel    = this.overlayPanel?.nativeElement;
    if (!panel) return;

    this.openTl?.kill();
    document.body.style.overflow = '';

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      gsap.set(panel, { opacity: 0, y: 32 });
      if (backdrop) gsap.set(backdrop, { opacity: 0 });
      this.host.style.pointerEvents = 'none';
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.closeTl = gsap.timeline({
        onComplete: () => { this.host.style.pointerEvents = 'none'; }
      });

      this.closeTl.to(panel, {
        opacity: 0, y: 24, scale: 0.97,
        duration: 0.3, ease: 'power2.in'
      });

      if (backdrop) {
        this.closeTl.to(backdrop, {
          opacity: 0,
          duration: 0.25,
          ease: 'power1.in'
        }, '-=0.15');
      }
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.openTl?.kill();
    this.closeTl?.kill();
    if (isPlatformBrowser(this.platformId)) document.body.style.overflow = '';
  }
}
