import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PersonalData } from '@app/core/models';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  @Input() personal!: PersonalData;
  private titleService = inject(Title);

  constructor() {
    this.titleService.setTitle('UL | About');
  }
}
