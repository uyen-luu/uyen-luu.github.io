import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Project } from '@app/core/models';
import { MatExpansionModule } from '@angular/material/expansion';
import { DataService } from '@app/core/services';

@Component({
  selector: 'app-portfolio',
  imports: [MatExpansionModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioComponent {
  readonly panelOpenState = signal(false);
  projects!: Project[];
  private _dataService = inject(DataService);
  private titleService = inject(Title);
  private _ref = inject(ChangeDetectorRef);

  constructor() {
    this.titleService.setTitle('BC | Portfolio');
    this._dataService.getProjects().subscribe((res) => {
      this.projects = res;
      this._ref.markForCheck();
    });
  }
}
