import { KeyValuePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CodePreviewComponent } from '@app/core/layout/code-preview/code-preview.component';
import { PersonalData } from '@app/core/models';

@Component({
  selector: 'app-bio',
  imports: [KeyValuePipe, CodePreviewComponent],
  templateUrl: './bio.component.html',
  styleUrl: './bio.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BioComponent {
  personalData = input.required<PersonalData>();
  skills = ['Angular2+', '.NET', 'Azure'];
  booleanFields = {
    hardWorker: true,
    quickLearner: true,
    problemSolver: true,
  };
}
