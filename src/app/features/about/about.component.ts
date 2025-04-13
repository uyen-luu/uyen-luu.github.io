import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
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
  constructor(private titleService: Title) {
    this.titleService.setTitle('UL | About');
  }
}
