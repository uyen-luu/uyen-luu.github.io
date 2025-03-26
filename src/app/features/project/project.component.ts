import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Project } from '@app/core/models';
import { DataService } from '@app/core/services';

@Component({
  selector: 'app-project',
  imports: [],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectComponent implements OnInit {
  projects!: Project[];

  constructor(private _dataService: DataService) {}
  ngOnInit(): void {
    this._dataService.getProjects().subscribe((res) => (this.projects = res));
  }
}
