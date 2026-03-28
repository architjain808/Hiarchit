import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'work',
    loadComponent: () => import('./components/projects-page/projects-page.component').then(m => m.ProjectsPageComponent)
  },
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.routes').then(m => m.BLOG_ROUTES)
  },
  { path: '**', redirectTo: '' }
];
