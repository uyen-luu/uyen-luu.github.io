import { Routes } from '@angular/router';
import { HomeComponent, NotFoundComponent, SkillComponent } from '@app/features';

// About, contact, etc. are sections of the home page (linked as /#about),
// so the old standalone paths redirect there instead of rendering a partial page.
export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Uyen Luu' },
  { path: 'skills', component: SkillComponent, title: 'UL | Skills' },
  { path: 'home', redirectTo: '' },
  { path: 'about', redirectTo: '' },
  { path: 'portfolio', redirectTo: '' },
  { path: 'contact', redirectTo: '' },
  { path: '**', component: NotFoundComponent, title: 'UL | Not Found' },
];
