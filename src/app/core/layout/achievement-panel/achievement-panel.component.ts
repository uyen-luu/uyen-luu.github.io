import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { GlowCardComponent } from '../glow-card/glow-card.component';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { GlowCard } from '@app/core/models';

@Component({
  selector: 'app-achievement-panel',
  imports: [GlowCardComponent, LottieComponent],
  templateUrl: './achievement-panel.component.html',
  styleUrl: './achievement-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AchievementPanelComponent {
  title = input.required<string>();
  items = input.required<GlowCard[]>();
  // Fetched at runtime rather than imported, so the animation JSON stays out of the main bundle.
  animationPath = input.required<string>();
  icon = input<string>();
  animationOptions = computed<AnimationOptions>(() => ({
    loop: true,
    autoplay: true,
    path: this.animationPath(),
  }));
}
