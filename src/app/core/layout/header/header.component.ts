import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  items = [
    {
      name: 'About',
      path: '/#about',
    },
    {
      name: 'Experience',
      path: '/#experience',
    },
    {
      name: 'Skills',
      path: '/#skills',
    },
    {
      name: 'Education',
      path: '/#education',
    },
    {
      name: 'Blogs',
      path: '/#blogs',
    },
    {
      name: 'Projects',
      path: '/#projects',
    },
  ];
}
