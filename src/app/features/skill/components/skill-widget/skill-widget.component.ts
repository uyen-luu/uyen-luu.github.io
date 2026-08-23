import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Skill } from '@app/core/models';
import { DataService } from '@app/core/services';
import { SkillItemComponent } from "../skill-item/skill-item.component";
import { RouterLinkWithHref } from "@angular/router";

@Component({
  selector: 'app-skill-widget',
  imports: [CommonModule, SkillItemComponent, RouterLinkWithHref],
  templateUrl: './skill-widget.component.html',
  styleUrl: './skill-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillWidgetComponent implements OnInit {
  duration = 1;
  private _dataService = inject(DataService);
  private _ref = inject(ChangeDetectorRef);
  skills: Skill[] = [];
  ngOnInit(): void {
    this._dataService.getSkills().subscribe((res) => {
      this.skills = res;
      this.duration = this.skills.length;
      this._ref.markForCheck();
    });
  }
}
