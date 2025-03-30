import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { GlowCard } from '@app/core/models';
import { DataService } from '@app/core/services';
import lottieFile from '@assets/lottie/study.json';
import { AchievementPannelComponent } from '@app/core/layout/achievement-pannel/achievement-pannel.component';

@Component({
  selector: 'app-education',
  imports: [AchievementPannelComponent],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EducationComponent implements OnInit {
  items!: GlowCard[];
  animationData = lottieFile;
  constructor(
    private _dataService: DataService,
    private _ref: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this._dataService.getEducations().subscribe((res) => {
      this.items = res.map(
        (i) => new GlowCard({ ...i, organization: i.institution })
      );
      this._ref.markForCheck();
    });
  }
}
