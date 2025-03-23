import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CodePreviewComponent } from '@app/core/layout/code-preview/code-preview.component';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, CodePreviewComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {}
  profile = {
    name: 'Uyen Luu',
    jobTitle: 'Full-stack Developer',
    socials: [
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
    ],
  };
}
