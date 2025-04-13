import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ContainerComponent,
  FooterComponent,
  HeaderComponent,
} from '@app/core/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeaderComponent, ContainerComponent, FooterComponent],
})
export class AppComponent {
  title = 'ul-portfolio';
}
