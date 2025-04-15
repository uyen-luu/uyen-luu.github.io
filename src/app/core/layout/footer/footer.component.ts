import { CommonModule, NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { PersonalData } from '@app/core/models';
import { DataService } from '@app/core/services';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
  currentYear!: string;
  personal!: PersonalData;
  constructor(
    private _dataService: DataService,
    private _ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear().toString();
    this._dataService.getPersonalData().subscribe((res) => {
      this.personal = res;
      this._ref.markForCheck();
    });
  }
}
