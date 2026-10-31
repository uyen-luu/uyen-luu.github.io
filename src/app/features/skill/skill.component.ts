import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DataService } from '@app/core/services';
import { SkillItemComponent } from './components';
import { groupBy } from 'lodash-es';

@Component({
  selector: 'app-skill',
  imports: [SkillItemComponent],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillComponent {
  private skills = toSignal(inject(DataService).getSkills(), {
    initialValue: [],
  });
  items = computed(() => Object.entries(groupBy(this.skills(), 'category')));
}
