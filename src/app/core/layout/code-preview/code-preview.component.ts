import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-code-preview',
  imports: [CommonModule],
  templateUrl: './code-preview.component.html',
  styleUrl: './code-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodePreviewComponent {
  skills = [
    'React',
    'NextJS',
    'Redux',
    'Express',
    'NestJS',
    'MySql',
    'MongoDB',
    'Docker',
    'AWS',
  ];
  booleanFields = {
    hardWorker: true,
    quickLearner: true,
    problemSolver: true,
  };
}
