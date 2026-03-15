import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Skill } from '@app/core/models';
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
export class SkillComponent implements OnInit {
  private _dataService = inject(DataService);
  private _ref = inject(ChangeDetectorRef);
  duration = 1;
  items: Map<string, Skill[]> = new Map<string, Skill[]>();
  skills: Skill[] = [];
  ngOnInit(): void {
    this._dataService.getSkills().subscribe((skills) => {
      const grouped = groupBy(skills, 'category');
      this.items = new Map<string, Skill[]>(Object.entries(grouped));
      this.duration = this.skills.length;
      this._ref.markForCheck();
    });
  }
}
