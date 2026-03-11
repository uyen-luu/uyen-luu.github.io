
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { CodePreviewComponent } from '@app/core/layout/code-preview/code-preview.component';
import { Project } from '@app/core/models';
import { DataService } from '@app/core/services';

@Component({
  selector: 'app-project',
  imports: [CodePreviewComponent],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectComponent implements OnInit {
  projects!: Project[];
  private _dataService = inject(DataService);
  private _ref = inject(ChangeDetectorRef);
  ngOnInit(): void {
    this._dataService.getProjects().subscribe((res) => {
      this.projects = res;
      this._ref.markForCheck();
    });
  }
}
