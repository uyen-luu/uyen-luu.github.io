
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PersonalData } from '@app/core/models';
import { DataService } from '@app/core/services';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent implements OnInit {
  contact!: PersonalData;
  private titleService = inject(Title);
  private _dataService = inject(DataService);
  private _ref = inject(ChangeDetectorRef);

  constructor() {
    this.titleService.setTitle('UL | Contact');
  }
  ngOnInit(): void {
    this._dataService.getPersonalData().subscribe((res) => {
      this.contact = res;
      this._ref.markForCheck();
    });
  }
}
