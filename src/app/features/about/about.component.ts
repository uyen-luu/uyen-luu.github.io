import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PersonalData } from '@app/core/models';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  personal = input.required<PersonalData>();
}
