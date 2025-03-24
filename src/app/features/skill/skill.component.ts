import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skill',
  imports: [CommonModule],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillComponent implements OnInit {
  private skillsData = [
    'HTML',
    'CSS',
    'Javascript',
    'Typescript',
    'React',
    'Next JS',
    'Tailwind',
    'MongoDB',
    'MySQL',
    'PostgreSQL',
    'Git',
    'AWS',
    'Bootstrap',
    'Docker',
    'Go',
    'Figma',
    'Firebase',
    'MaterialUI',
    'Nginx',
    'Strapi',
  ];

  skills: { name: string; imagePath: string }[] = [];
  ngOnInit(): void {
    this.skills = this.skillsData.map((skill) => ({
      name: skill,
      imagePath: `assets/svg/skills/${this.toImageName(skill)}.svg`,
    }));
  }

  toImageName = (text: string) =>
    text
      .toLowerCase()
      .split(' ')
      .map((word, index) =>
        index === 0 ? word : word.charAt(0) + word.slice(1)
      )
      .join('');
}
