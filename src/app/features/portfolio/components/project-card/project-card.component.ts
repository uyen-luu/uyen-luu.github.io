import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { Card } from '@app/core/models';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-project-card',
  imports: [],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCardComponent {
  @Input() card = {} as Card;
  private _snackBar = inject(MatSnackBar);
  durationInSeconds = 5;
  openCard() {
    this._snackBar.open('Comming soon');
  }
}
