import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { GlowDirective } from '@app/core/directives/glow.directive';
import { Experience } from '@app/core/models';
import { DataService } from '@app/core/services';
import experience from '../../../assets/lottie/code.json';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
export function playerFactory() {
  return import('lottie-web'); // ✅ Lazy loading Lottie
}
@Component({
  selector: 'app-experience',
  imports: [CommonModule, GlowDirective, LottieComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent implements OnInit {
  items!: Experience[];
  animationOptions: AnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: experience,
  };
  constructor(
    private _dataService: DataService,
    private _ref: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this._dataService.getExperiences().subscribe((res) => {
      this.items = res;
      this._ref.markForCheck();
    });
  }
}
