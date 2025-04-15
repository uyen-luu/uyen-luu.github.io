import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ContainerComponent,
  FooterComponent,
  HeaderComponent,
} from '@app/core/layout';
import { ScrollToTopComponent } from './core/layout/scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    HeaderComponent,
    ContainerComponent,
    FooterComponent,
    ScrollToTopComponent,
  ],
})
export class AppComponent {
  title = 'ul-portfolio';
}
