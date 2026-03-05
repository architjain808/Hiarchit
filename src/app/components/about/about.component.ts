import { Component } from '@angular/core';

interface Skill {
  name: string;
  icon: string;
  iconType: 'brands' | 'solid';
  rating: number;
}

interface SkillGroup {
  label: string;
  skills: Skill[];
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  skillGroups: SkillGroup[] = [
    {
      label: 'Frontend Development',
      skills: [
        { name: 'Angular', icon: 'fa-angular', iconType: 'brands', rating: 4.5 },
        { name: 'JavaScript', icon: 'fa-js', iconType: 'brands', rating: 4.5 },
        { name: 'TypeScript', icon: 'fa-js', iconType: 'brands', rating: 4.5 },
        { name: 'React', icon: 'fa-react', iconType: 'brands', rating: 3 },
      ],
    },
    {
      label: 'UI/UX Design',
      skills: [
        { name: 'Material UI', icon: 'fa-m', iconType: 'solid', rating: 4 },
        { name: 'Bootstrap', icon: 'fa-bootstrap', iconType: 'brands', rating: 4 },
        { name: 'Figma', icon: 'fa-figma', iconType: 'brands', rating: 3 },
      ],
    },
    {
      label: 'Programming Languages',
      skills: [
        { name: 'HTML5', icon: 'fa-html5', iconType: 'brands', rating: 4.5 },
        { name: 'CSS3/SCSS', icon: 'fa-css3-alt', iconType: 'brands', rating: 4.5 },
        { name: 'C++', icon: 'fa-c', iconType: 'solid', rating: 3 },
      ],
    },
    {
      label: 'Version Control',
      skills: [
        { name: 'Git', icon: 'fa-git', iconType: 'brands', rating: 4.5 },
        { name: 'Github', icon: 'fa-github', iconType: 'brands', rating: 4.5 },
        { name: 'Bitbucket', icon: 'fa-bitbucket', iconType: 'brands', rating: 3 },
      ],
    },
  ];

  getStars(rating: number): string[] {
    const stars: string[] = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push('fa-star');
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push('fa-star-half');
      }
    }
    return stars;
  }
}
