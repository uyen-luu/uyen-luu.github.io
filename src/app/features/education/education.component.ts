import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Education } from '@app/core/models';
import { DataService } from '@app/core/services';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import lottieFile from '../../../assets/lottie/study.json';
import { GlowCardComponent } from '@app/core/layout/glow-card/glow-card.component';

@Component({
  selector: 'app-education',
  imports: [CommonModule, LottieComponent, GlowCardComponent],
  templateUrl: './education.component.html',
  styleUrl: './education.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EducationComponent implements OnInit {
  items!: Education[];
  animationOptions: AnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: lottieFile,
  };
  constructor(
    private _dataService: DataService,
    private _ref: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this._dataService.getEducations().subscribe((res) => {
      this.items = res;
      this._ref.markForCheck();
    });
  }
}
