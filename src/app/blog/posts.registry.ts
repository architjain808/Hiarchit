export interface BlogPost {
  slug: string;
  title: string;
  date: string;         // ISO date string e.g. '2026-03-21'
  excerpt: string;
  tags: string[];
  readingTime: string;
  content: string;      // HTML string rendered in the post view
}

// ---------------------------------------------------------------------------
// Import individual post files from src/app/blog/posts/
// Add a new import + entry here whenever you publish a new post.
// ---------------------------------------------------------------------------
import { BUILDING_MODERN_ANGULAR_APPS } from './posts/building-modern-angular-apps';

export const POST_REGISTRY: BlogPost[] = [
  BUILDING_MODERN_ANGULAR_APPS,
];

// Convenience helpers
export function getPostBySlug(slug: string): BlogPost | undefined {
  return POST_REGISTRY.find(p => p.slug === slug);
}

export function getAllPosts(): BlogPost[] {
  // Return newest-first
  return [...POST_REGISTRY].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
