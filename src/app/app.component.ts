import {
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { SeoService } from './services/seo.service';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { CodeBackgroundComponent } from './components/code-background/code-background.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeroComponent, AboutComponent, ExperienceComponent, CodeBackgroundComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.setDefaultSEO();
  }
}
