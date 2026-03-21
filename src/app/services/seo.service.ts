import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

const SITE_URL = 'https://hiarchit.online';
const AUTHOR = 'Archit Jain';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private meta = inject(Meta);
  private title = inject(Title);
  private platformId = inject(PLATFORM_ID);

  setBlogListSEO(): void {
    this.title.setTitle('Blog | Archit Jain — Frontend Developer');
    this.meta.updateTag({ name: 'description', content: 'Thoughts on frontend development, Angular, TypeScript, AI tools, and the modern web by Archit Jain.' });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ property: 'og:title', content: 'Blog | Archit Jain' });
    this.meta.updateTag({ property: 'og:description', content: 'Thoughts on frontend development, Angular, TypeScript, AI tools, and the modern web.' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: `${SITE_URL}/blog` });
    this.setCanonical(`${SITE_URL}/blog`);
  }

  setBlogPostSEO(title: string, excerpt: string, slug: string): void {
    const url = `${SITE_URL}/blog/${slug}`;
    this.title.setTitle(`${title} | Archit Jain`);
    this.meta.updateTag({ name: 'description', content: excerpt });
    this.meta.updateTag({ name: 'author', content: AUTHOR });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: excerpt });
    this.meta.updateTag({ property: 'og:type', content: 'article' });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:site_name', content: 'Archit Jain Blog' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: excerpt });
    this.meta.updateTag({ name: 'twitter:creator', content: '@ArchitJ808' });
    this.setCanonical(url);
    this.setArticleSchema(title, excerpt, url);
  }

  setDefaultSEO(): void {
    this.title.setTitle('Archit Jain | Frontend Developer - Angular & React Expert');
    this.meta.updateTag({
      name: 'description',
      content: 'Archit Jain — Frontend Developer specializing in Angular, React, TypeScript, and modern web technologies. Building high-performance, scalable applications.',
    });
    this.meta.updateTag({ name: 'author', content: AUTHOR });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ property: 'og:title', content: 'Archit Jain | Frontend Developer' });
    this.meta.updateTag({
      property: 'og:description',
      content: 'Frontend Developer specializing in Angular, React, and modern web technologies. Building high-performance, scalable applications.',
    });
    this.meta.updateTag({ property: 'og:url', content: SITE_URL });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: 'Archit Jain | Frontend Developer' });
    this.meta.updateTag({
      name: 'twitter:description',
      content: 'Frontend Developer specializing in Angular, React, and modern web technologies.',
    });
    this.setCanonical(SITE_URL);
  }

  private setCanonical(url: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setArticleSchema(title: string, excerpt: string, url: string): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const id = 'article-schema';
    document.getElementById(id)?.remove();
    const script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description: excerpt,
      url,
      author: {
        '@type': 'Person',
        name: AUTHOR,
        url: SITE_URL,
        sameAs: [
          'https://twitter.com/ArchitJ808',
          'https://www.linkedin.com/in/hiarchit/',
          'https://github.com/architjain808',
        ],
      },
      publisher: {
        '@type': 'Person',
        name: AUTHOR,
        url: SITE_URL,
      },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    });
    document.head.appendChild(script);
  }
}
