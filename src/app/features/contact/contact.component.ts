
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
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
  constructor(
    private titleService: Title,
    private _dataService: DataService,
    private _ref: ChangeDetectorRef
  ) {
    this.titleService.setTitle('UL | Contact');
  }
  ngOnInit(): void {
    this._dataService.getPersonalData().subscribe((res) => {
      this.contact = res;
      this._ref.markForCheck();
    });
  }
}
