import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CodePreviewComponent } from '@app/core/layout/code-preview/code-preview.component';
import { PersonalData } from '@app/core/models';

@Component({
  selector: 'app-bio',
  imports: [CommonModule, CodePreviewComponent],
  templateUrl: './bio.component.html',
  styleUrl: './bio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BioComponent {
  @Input() personalData!: PersonalData;
  skills = ['Angular2+', '.NET', 'Azure'];
  booleanFields = {
    hardWorker: true,
    quickLearner: true,
    problemSolver: true,
  };
}
