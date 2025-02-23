import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  items = [
    {
      name: 'Home',
      path: '/home',
    },
    {
      name: 'About',
      path: '/about',
    },
    {
      name: 'Education',
      path: '/skills',
    },
    {
      name: 'Portfolio',
      path: '/portfolio',
    },
    {
      name: 'Contact',
      path: '/contact',
    },
  ];
}
