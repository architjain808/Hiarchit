import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private meta = inject(Meta);
  private title = inject(Title);

  setDefaultSEO(): void {
    this.title.setTitle('Archit Jain | Frontend Developer - Angular & React Expert');

    this.meta.updateTag({
      name: 'description',
      content:
        'Archit Jain — Frontend Developer specializing in Angular, React, TypeScript, and modern web technologies. Building high-performance, scalable applications.',
    });
    this.meta.updateTag({ name: 'author', content: 'Archit Jain' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    // Open Graph
    this.meta.updateTag({ property: 'og:title', content: 'Archit Jain | Frontend Developer' });
    this.meta.updateTag({
      property: 'og:description',
      content:
        'Frontend Developer specializing in Angular, React, and modern web technologies. Building high-performance, scalable applications.',
    });
    this.meta.updateTag({ property: 'og:url', content: 'https://architjain808.github.io/Hiarchit/' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });

    // Twitter Card
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: 'Archit Jain | Frontend Developer' });
    this.meta.updateTag({
      name: 'twitter:description',
      content: 'Frontend Developer specializing in Angular, React, and modern web technologies.',
    });
  }
}
