import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ListSpellComponent } from './components/list-spell/list-spell.component';
import { CreateSpellComponent } from './components/create-spell/create-spell.component';
import { ActiveSpellsComponent } from './components/active-spells/active-spells.component';
import { LoginComponent } from './components/login/login.component';
import { SpellBookListComponent } from './spell-book-list/spell-book-list.component';
import { AuthGuard } from './guards/auth.guard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'create-spell', component: CreateSpellComponent, canActivate: [AuthGuard] },
      { path: 'list-spells', component: ListSpellComponent, canActivate: [AuthGuard] },
      { path: 'active-spells', component: ActiveSpellsComponent, canActivate: [AuthGuard] },
      { path: 'spell-books', component: SpellBookListComponent, canActivate: [AuthGuard] }
    ])
  ]
};
