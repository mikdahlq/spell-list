import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ListSpellComponent } from './components/list-spell/list-spell.component';
import { CreateSpellComponent } from './components/create-spell/create-spell.component';
import { ActiveSpellsComponent } from './components/active-spells/active-spells.component';
import { LoginComponent } from './components/login/login.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'create-spell', component: CreateSpellComponent },
      { path: 'list-spells', component: ListSpellComponent },
      { path: 'active-spells', component: ActiveSpellsComponent }
    ])
  ]
};
