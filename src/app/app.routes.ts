import { Routes } from '@angular/router';
import {
  AboutComponent,
  ContactComponent,
  HomeComponent,
  NotFoundComponent,
  PortfolioComponent,
  SkillComponent,
} from '@app/features';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'skills', component: SkillComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'contact', component: ContactComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: NotFoundComponent },
];
