import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Project } from '@app/core/models';
import { DataService } from '@app/core/services';

@Component({
  selector: 'app-project',
  imports: [CommonModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectComponent implements OnInit {
  projects!: Project[];

  constructor(
    private _dataService: DataService,
    private _ref: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this._dataService.getProjects().subscribe((res) => {
      this.projects = res;
      this._ref.markForCheck();
    });
  }
}
