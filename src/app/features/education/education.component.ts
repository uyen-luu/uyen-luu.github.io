import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GlowCard } from '@app/core/models';
import { DataService } from '@app/core/services';
import { AchievementPanelComponent } from '@app/core/layout/achievement-panel/achievement-panel.component';

@Component({
  selector: 'app-education',
  imports: [AchievementPanelComponent],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EducationComponent {
  items = toSignal(
    inject(DataService)
      .getEducations()
      .pipe(
        map((res) =>
          res.map((i) => new GlowCard({ ...i, organization: i.institution }))
        )
      ),
    { initialValue: [] }
  );
}
