
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { ExperienceComponent } from '../experience/experience.component';
import { ProjectComponent } from '../project/project.component';
import { PersonalData } from '@app/core/models';
import { DataService } from '@app/core/services';
import { BioComponent } from '../bio/bio.component';
import { EducationComponent } from '../education/education.component';
import { ContactComponent } from '../contact/contact.component';
import { CertificationComponent } from '../certification/certification.component';
import { SkillWidgetComponent } from '@app/features/skill/components';

@Component({
  selector: 'app-home',
  imports: [
    BioComponent,
    AboutComponent,
    ExperienceComponent,
    SkillWidgetComponent,
    ProjectComponent,
    EducationComponent,
    ContactComponent,
    CertificationComponent
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
