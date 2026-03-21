import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
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

  post: BlogPost | undefined;

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.post = getPostBySlug(slug);

    if (this.post) {
      this.seoService.setBlogPostSEO(this.post.title, this.post.excerpt);
    }
  }
}
