import {
  Component, OnInit, AfterViewInit, OnDestroy,
  ElementRef, ViewChild, QueryList, ViewChildren,
  PLATFORM_ID, inject, NgZone, ChangeDetectorRef
} from '@angular/core';
import { isPlatformBrowser, NgIf, NgFor } from '@angular/common';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SeoService } from '../../services/seo.service';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  year: string;
  tags: string[];
  desc: string;
  impact: string;
  url: string;
  svgAsset: string;
  role: string;
}

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.scss'
})
export class ProjectsPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('threeCanvas') threeCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('heroTitle') heroTitle!: ElementRef;
  @ViewChild('heroSub') heroSub!: ElementRef;
  @ViewChild('heroCounter') heroCounter!: ElementRef;
  @ViewChildren('listItem') listItems!: QueryList<ElementRef>;

  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);
  private seoService = inject(SeoService);
  private ctx!: gsap.Context;
  private threeRenderer: any = null;
  private animFrameId: number | null = null;

  activeProject: Project | null = null;
  hoveredId: number | null = null;
  modalOpen = false;
  previewPos = { x: 0, y: 0 };

  readonly projects: Project[] = [
    {
      id: 1,
      title: 'UMANG Web',
      subtitle: 'Government Digital Platform',
      year: '2024',
      tags: ['Angular', 'RxJS', 'Enterprise UI'],
      desc: 'Developed the core web platform for UMANG, aggregating Pan-India e-Governance services into a single, unified interface. Serves millions of citizens with a highly scalable and robust architecture powering real-time government data.',
      impact: 'Millions of daily active users',
      url: 'https://web.umang.gov.in/',
      svgAsset: 'assets/images/proj-umang.svg',
      role: 'Frontend Engineer'
    },
    {
      id: 2,
      title: 'ITPO Booking',
      subtitle: 'Exhibition Booking Platform',
      year: '2024',
      tags: ['Angular', 'Booking System', 'Gov Tech'],
      desc: 'Official booking platform for the India Trade Promotion Organisation (Bharat Mandapam). Streamlined the exhibition and event booking process with a modern and intuitive interface supporting thousands of bookings daily.',
      impact: '10,000+ bookings processed',
      url: 'https://booking.indiatradefair.com/',
      svgAsset: 'assets/images/proj-itpo.svg',
      role: 'Lead Frontend Developer'
    },
    {
      id: 3,
      title: 'Anuvachan',
      subtitle: 'AI Ancient Text Translator',
      year: '2023',
      tags: ['Angular', 'TypeScript', 'AI Integration'],
      desc: 'Web application for transcription and translation of ancient Sanskrit and Hindi texts. A crucial tool for deciphering ancient scriptures that reduced manual effort by 98%, making ancient wisdom accessible to modern scholars.',
      impact: '98% reduction in manual effort',
      url: 'https://github.com/architjain808/Anuvachan',
      svgAsset: 'assets/images/proj-anuvachan.svg',
      role: 'Full Stack Developer'
    },
    {
      id: 4,
      title: 'TalentTrace',
      subtitle: 'AI Recruitment SaaS',
      year: '2023',
      tags: ['Next.js', 'AI/ML', 'SaaS'],
      desc: 'AI-driven recruitment platform designed to streamline hiring processes. Empowers recruiters with intelligent candidate matching and automated screening workflows, cutting time-to-hire dramatically.',
      impact: 'Intelligent candidate matching',
      url: 'https://github.com/architjain808/TalentTrace',
      svgAsset: 'assets/images/proj-talenttrace.svg',
      role: 'Product Engineer'
    }
  ];

  ngOnInit(): void {
    this.seoService.setWorkSEO();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.registerPlugin(ScrollTrigger);
      this.ngZone.runOutsideAngular(() => {
        this.initThreeJS();
        this.initAnimations();
      });
    }
  }

  private initAnimations(): void {
    this.ctx = gsap.context(() => {
      // Hero heading lines reveal
      gsap.from(this.heroTitle.nativeElement.querySelectorAll('.reveal-line'), {
        y: '110%',
        rotate: 2,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.3
      });

      gsap.from(this.heroSub.nativeElement, {
        y: 20,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.8
      });

      gsap.from(this.heroCounter.nativeElement, {
        y: 20,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        delay: 1.0
      });

      // List items stagger on scroll
      this.listItems.forEach((item, i) => {
        gsap.from(item.nativeElement, {
          x: -40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item.nativeElement,
            start: 'top 85%',
          },
          delay: i * 0.08
        });
      });
    });
  }

  private async initThreeJS(): Promise<void> {
    const THREE = await import('three');
    const canvas = this.threeCanvas.nativeElement;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(w, h, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.threeRenderer = renderer;

    // ── Particles ──────────────────────────────────────────────
    const count = 180;
    const positions = new Float32Array(count * 3);
    const spread = 120;
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x9AD741, size: 0.8, transparent: true, opacity: 0.7 });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    // ── Connection lines ────────────────────────────────────────
    const linePositions: number[] = [];
    const threshold = 18;
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < threshold) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }
    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(linePositions), 3));
    const lMat = new THREE.LineBasicMaterial({ color: 0x9AD741, transparent: true, opacity: 0.12 });
    scene.add(new THREE.LineSegments(lGeo, lMat));

    // ── Floating wireframe shapes ───────────────────────────────
    const shapes: any[] = [];
    const shapeMat = new THREE.MeshBasicMaterial({ color: 0x9AD741, wireframe: true, transparent: true, opacity: 0.15 });
    const shapeGeos = [
      new THREE.OctahedronGeometry(8, 0),
      new THREE.TetrahedronGeometry(6, 0),
      new THREE.IcosahedronGeometry(5, 0),
    ];
    shapeGeos.forEach((geo, i) => {
      const mesh = new THREE.Mesh(geo, shapeMat);
      mesh.position.set(-40 + i * 40, (Math.random() - 0.5) * 20, -20);
      scene.add(mesh);
      shapes.push(mesh);
    });

    // ── Mouse parallax ──────────────────────────────────────────
    let mouseX = 0, mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── Resize handler ──────────────────────────────────────────
    const onResize = () => {
      const nw = canvas.clientWidth;
      const nh = canvas.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh, false);
    };
    window.addEventListener('resize', onResize);

    // ── Animation loop ──────────────────────────────────────────
    let t = 0;
    const animate = () => {
      this.animFrameId = requestAnimationFrame(animate);
      t += 0.005;
      points.rotation.y = t * 0.1 + mouseX * 0.05;
      points.rotation.x = mouseY * 0.03;
      shapes.forEach((s, i) => {
        s.rotation.x = t * 0.4 + i;
        s.rotation.y = t * 0.3 + i;
        s.position.y = Math.sin(t + i * 2) * 8;
      });
      camera.position.x += (mouseX * 8 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 8 - camera.position.y) * 0.05;
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup refs for ngOnDestroy
    (this as any)._threeCleanup = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (this.animFrameId !== null) cancelAnimationFrame(this.animFrameId);
      renderer.dispose();
    };
  }

  onListHover(id: number, event: MouseEvent): void {
    this.hoveredId = id;
  }

  onListLeave(): void {
    this.hoveredId = null;
  }

  onMouseMove(event: MouseEvent): void {
    this.previewPos = { x: event.clientX, y: event.clientY };
  }

  openModal(project: Project): void {
    this.activeProject = project;
    this.modalOpen = true;
    this.cdr.detectChanges();
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo('.modal-overlay', { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      gsap.fromTo('.modal-panel', { x: '100%' }, { x: '0%', duration: 0.6, ease: 'power4.out' });
    }
  }

  closeModal(): void {
    if (isPlatformBrowser(this.platformId)) {
      gsap.to('.modal-panel', {
        x: '100%',
        duration: 0.45,
        ease: 'power4.in',
        onComplete: () => {
          this.modalOpen = false;
          this.activeProject = null;
          document.body.style.overflow = '';
          this.cdr.detectChanges();
        }
      });
      gsap.to('.modal-overlay', { opacity: 0, duration: 0.4, ease: 'power2.in' });
    }
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
    (this as any)._threeCleanup?.();
  }
}
