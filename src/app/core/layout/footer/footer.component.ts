import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PersonalData } from '@app/core/models';
import { DataService } from '@app/core/services';

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

  personal!: PersonalData;
  constructor(private _dataService: DataService) {}

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear().toString();
    this._dataService
      .getPersonalData()
      .subscribe((res) => (this.personal = res));
  }
}
