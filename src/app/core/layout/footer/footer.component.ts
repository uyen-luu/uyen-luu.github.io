import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
  currentYear!: string;
  author = 'Uyen Luu';
  externalLinks = [
    {
      uri: 'https://www.linkedin.com/in/uyen-luu/',
      icon: 'fab fa-linkedin',
    },
    {
      uri: 'https://github.com/uyen-luu',
      icon: 'fab fa-github',
    },
    {
      uri: 'mailto:it.luudinhuyen@gmail.com',
      icon: 'fas fa-envelope',
    },
    {
      uri: 'https://www.facebook.com/it.luudinhuyen/',
      icon: 'fab fa-facebook',
    },
  ];

  constructor() {}

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear().toString();
  }
}
