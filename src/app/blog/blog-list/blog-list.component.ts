import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { SeoService } from '../../services/seo.service';
import { getAllPosts, BlogPost } from '../posts.registry';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss',
})
export class BlogListComponent implements OnInit {
  private seoService = inject(SeoService);

  posts: BlogPost[] = getAllPosts();

  ngOnInit(): void {
    this.seoService.setBlogListSEO();
  }
}
