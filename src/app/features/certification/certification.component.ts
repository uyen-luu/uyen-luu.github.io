import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { AchievementPannelComponent } from '@app/core/layout/achievement-pannel/achievement-pannel.component';
import { GlowCard } from '@app/core/models';
import { DataService } from '@app/core/services';
import lottieFile from '@assets/lottie/cert.json';
@Component({
  selector: 'app-certification',
  imports: [AchievementPannelComponent],
  templateUrl: './certification.component.html',
  styleUrl: './certification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CertificationComponent implements OnInit {
  items!: GlowCard[];
  animationData = lottieFile;
  private _dataService = inject(DataService);
  private _ref = inject(ChangeDetectorRef);
  ngOnInit(): void {
    this._dataService.getCerts().subscribe((res) => {
      this.items = res;
      this._ref.markForCheck();
    });
  }
}
