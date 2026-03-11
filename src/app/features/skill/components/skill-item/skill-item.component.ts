import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Skill } from '@app/core/models';

@Component({
  selector: 'app-skill-item',
  imports: [],
  templateUrl: './skill-item.component.html',
  styleUrl: './skill-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillItemComponent {
  @Input() item!: Skill;
}
