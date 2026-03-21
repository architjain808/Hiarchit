import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'blog',
    loadChildren: () => import('./blog/blog.routes').then(m => m.BLOG_ROUTES)
  },
  { path: '**', redirectTo: '' }
];
