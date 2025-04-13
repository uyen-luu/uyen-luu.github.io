import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { GlowCard } from '@app/core/models';
import { DataService } from '@app/core/services';
import experience from '@assets/lottie/code.json';
import { AchievementPannelComponent } from '@app/core/layout/achievement-pannel/achievement-pannel.component';
export function playerFactory() {
  return import('lottie-web'); // ✅ Lazy loading Lottie
}
@Component({
  selector: 'app-experience',
  imports: [AchievementPannelComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent implements OnInit {
  items!: GlowCard[];
  animationData = experience;
  constructor(
    private _dataService: DataService,
    private _ref: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this._dataService.getExperiences().subscribe((res) => {
      this.items = res.map(
        (i) => new GlowCard({ ...i, organization: i.company })
      );
      this._ref.markForCheck();
    });
  }
}
