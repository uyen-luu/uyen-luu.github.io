import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CodePreviewComponent } from '@app/core/layout/code-preview/code-preview.component';
import { AboutComponent } from '../about/about.component';
import { ExperienceComponent } from '../experience/experience.component';
import { SkillComponent } from '../skill/skill.component';
import { ProjectComponent } from '../project/project.component';
import { PersonalData } from '@app/core/models';
import { DataService } from '@app/core/services';
import { BioComponent } from '../bio/bio.component';
import { EducationComponent } from '../education/education.component';
import { ContactComponent } from '../contact/contact.component';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    BioComponent,
    AboutComponent,
    ExperienceComponent,
    SkillComponent,
    ProjectComponent,
    EducationComponent,
    ContactComponent
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
