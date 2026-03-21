import { BlogPost } from '../posts.registry';

export const BUILDING_MODERN_ANGULAR_APPS: BlogPost = {
  slug: 'building-modern-angular-apps',
  title: 'Building Modern Angular 19 Applications',
  date: '2026-03-21',
  excerpt:
    'A practical look at Angular 19 features — SSR with prerendering, standalone components, and GSAP animations — and how they come together in a real portfolio project.',
  tags: ['Angular', 'TypeScript', 'SSR', 'GSAP'],
  readingTime: '6 min read',
  content: `
<p>
  Angular 19 represents a major leap forward in developer experience.
  With first-class server-side rendering, standalone components by default,
  and seamless integration with modern animation libraries like GSAP, you can
  build fast, SEO-friendly applications without the boilerplate of older Angular versions.
</p>

<h2>Standalone components are now the default</h2>
<p>
  Gone are the days of declaring every component in an <code>NgModule</code>.
  In Angular 19 every component, directive, and pipe is standalone out of the box.
  You simply list your dependencies in the <code>imports</code> array of the
  <code>@Component</code> decorator and Angular takes care of the rest.
</p>
<pre><code>@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hero.component.html',
})
export class HeroComponent { }</code></pre>

<h2>SSR and prerendering out of the box</h2>
<p>
  Angular's application builder (<code>@angular-devkit/build-angular:application</code>)
  ships with built-in SSR and static prerendering support.
  Setting <code>"prerender": true</code> in <code>angular.json</code> instructs the CLI
  to crawl your router config and emit a static HTML file for every route at build time.
  The result: instant first paint and full SEO visibility even before JavaScript loads.
</p>

<h2>Guarding browser-only code</h2>
<p>
  When Angular renders on the server, <code>window</code>, <code>document</code>,
  and DOM APIs are unavailable.
  The canonical pattern is to inject <code>PLATFORM_ID</code> and gate browser code
  behind <code>isPlatformBrowser()</code>:
</p>
<pre><code>private platformId = inject(PLATFORM_ID);

ngAfterViewInit(): void {
  if (isPlatformBrowser(this.platformId)) {
    this.initAnimations(); // safe — only runs in the browser
  }
}</code></pre>

<h2>Smooth animations with GSAP + ScrollTrigger</h2>
<p>
  GSAP pairs beautifully with Angular. Run animations outside Angular's zone to avoid
  triggering unnecessary change-detection cycles, and always clean up with
  <code>gsap.context()</code> so scroll triggers don't leak between route navigations.
</p>
<pre><code>private ctx!: gsap.Context;

private initAnimations(): void {
  this.ngZone.runOutsideAngular(() => {
    gsap.registerPlugin(ScrollTrigger);
    this.ctx = gsap.context(() => {
      gsap.from('.hero-heading', { y: 60, opacity: 0, duration: 1 });
    });
  });
}

ngOnDestroy(): void { this.ctx?.revert(); }</code></pre>

<h2>Deploying to GitHub Pages</h2>
<p>
  A single GitHub Actions workflow handles the full pipeline: install → build → deploy.
  Because the output is pure static HTML + JS the site loads instantly worldwide
  with no server infrastructure to maintain.
</p>

<p>
  Angular 19 has made the "modern web app" dream genuinely accessible.
  Give it a try on your next project.
</p>
  `.trim(),
};
