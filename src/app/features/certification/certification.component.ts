import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AchievementPanelComponent } from '@app/core/layout/achievement-panel/achievement-panel.component';
import { DataService } from '@app/core/services';

@Component({
  selector: 'app-certification',
  imports: [AchievementPanelComponent],
  templateUrl: './certification.component.html',
  styleUrl: './certification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CertificationComponent {
  items = toSignal(inject(DataService).getCerts(), { initialValue: [] });
}
