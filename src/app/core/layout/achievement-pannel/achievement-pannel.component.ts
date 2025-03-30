import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { GlowCardComponent } from '../glow-card/glow-card.component';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { GlowCard } from '@app/core/models';

@Component({
  selector: 'app-achievement-pannel',
  imports: [CommonModule, GlowCardComponent, LottieComponent],
  templateUrl: './achievement-pannel.component.html',
  styleUrl: './achievement-pannel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AchievementPannelComponent implements OnInit {
  @Input() title!: string;
  @Input() items!: GlowCard[];
  @Input() animationData!: any;
  animationOptions!: AnimationOptions;
  constructor() {}
  ngOnInit(): void {
    this.animationOptions = {
      loop: true,
      autoplay: true,
      animationData: this.animationData,
    };
  }
}
