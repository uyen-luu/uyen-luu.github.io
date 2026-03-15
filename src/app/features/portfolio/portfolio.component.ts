import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Card, Project } from '@app/core/models';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { DataService } from '@app/core/services';

@Component({
  selector: 'app-portfolio',
  imports: [ProjectCardComponent, MatExpansionModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioComponent {
  readonly panelOpenState = signal(false);
  projects!: Project[];
  private _dataService = inject(DataService);
  private titleService = inject(Title);

  constructor() {
    this.titleService.setTitle('BC | Portfolio');
    this._dataService.getProjects().subscribe((res) => (this.projects = res));
  }

  trackById(index: number, project: Card): number {
    return project.id;
  }
}
