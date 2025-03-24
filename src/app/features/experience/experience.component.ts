import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-experience',
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent {
  items = [
    {
      duration: '(Jan 2022 - Present)',
      title: 'Software Engineer I',
      description: 'Teton Private Ltd.',
    },
    {
      duration: '(Jun 2021 - Jan 2022)',
      title: 'FullStack Developer',
      description: 'Fiverr (freelance)',
    },
    {
      duration: '(Jan 2018 - Present)',
      title: 'Self Employed',
      description: 'Code and build something in everyday.',
    },
  ];
}
