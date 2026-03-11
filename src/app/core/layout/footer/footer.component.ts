
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { PersonalData } from '@app/core/models';
import { DataService } from '@app/core/services';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
  currentYear!: string;
  personal!: PersonalData;
  private _dataService = inject(DataService);
  private _ref = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear().toString();
    this._dataService.getPersonalData().subscribe((res) => {
      this.personal = res;
      this._ref.markForCheck();
    });
  }
}
