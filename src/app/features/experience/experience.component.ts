import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GlowCard } from '@app/core/models';
import { DataService } from '@app/core/services';
import { AchievementPanelComponent } from '@app/core/layout/achievement-panel/achievement-panel.component';

@Component({
  selector: 'app-experience',
  imports: [AchievementPanelComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent {
  items = toSignal(
    inject(DataService)
      .getExperiences()
      .pipe(
        map((res) =>
          res.map((i) => new GlowCard({ ...i, organization: i.company }))
        )
      ),
    { initialValue: [] }
  );
}
