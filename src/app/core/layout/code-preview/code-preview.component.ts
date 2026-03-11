
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-code-preview',
  imports: [],
  templateUrl: './code-preview.component.html',
  styleUrl: './code-preview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodePreviewComponent {
  @Input() title?: string;
}
