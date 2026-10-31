import { UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [UpperCasePipe],
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
      name: 'Certs',
      path: '/#certs',
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
      name: 'Projects',
      path: '/#projects',
    },
  ];
}
