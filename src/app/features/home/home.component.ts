import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CodePreviewComponent } from '@app/core/layout/code-preview/code-preview.component';
import { AboutComponent } from '../about/about.component';
import { ExperienceComponent } from '../experience/experience.component';
import { SkillComponent } from '../skill/skill.component';
import { ProjectComponent } from '../project/project.component';
import { PersonalData } from '@app/core/models';
import { DataService } from '@app/core/services';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    CodePreviewComponent,
    AboutComponent,
    ExperienceComponent,
    SkillComponent,
    ProjectComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  personalData!: PersonalData;
  constructor(private _dataService: DataService) {}
  ngOnInit(): void {
    this._dataService
      .getPersonalData()
      .subscribe((res) => (this.personalData = res));
  }  
}
