import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SeoService } from '../../services/seo.service';
import { getPostBySlug, BlogPost } from '../posts.registry';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss',
})
export class BlogPostComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private seoService = inject(SeoService);
  private sanitizer = inject(DomSanitizer);

  post: BlogPost | undefined;
  safeContent: SafeHtml = '';

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.post = getPostBySlug(slug);

    if (this.post) {
      this.safeContent = this.sanitizer.bypassSecurityTrustHtml(this.post.content);
      this.seoService.setBlogPostSEO(this.post.title, this.post.excerpt, slug);
    }
  }
}
