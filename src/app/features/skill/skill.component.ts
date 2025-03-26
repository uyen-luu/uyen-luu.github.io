import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Skill } from '@app/core/models';
import { DataService } from '@app/core/services';

@Component({
  selector: 'app-skill',
  imports: [CommonModule],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillComponent implements OnInit {
  constructor(
    private _dataService: DataService,
    private _ref: ChangeDetectorRef
  ) {}
  skills: Skill[] = [];
  ngOnInit(): void {
    this._dataService.getSkills().subscribe((res) => {
      this.skills = res;
      this._ref.markForCheck();
    });
  }
}
