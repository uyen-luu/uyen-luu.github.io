import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DataService } from '@app/core/services';
import { SkillItemComponent } from '../skill-item/skill-item.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-skill-widget',
  imports: [SkillItemComponent, RouterLink],
  templateUrl: './skill-widget.component.html',
  styleUrl: './skill-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillWidgetComponent {
  skills = toSignal(inject(DataService).getSkills(), { initialValue: [] });
  // One second per skill keeps the marquee speed constant as the list grows.
  duration = computed(() => this.skills().length || 1);
}
