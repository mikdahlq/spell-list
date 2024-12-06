import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CreateSpellComponent } from './components/create-spell/create-spell.component';
import { ListSpellComponent } from './components/list-spell/list-spell.component';

const routes: Routes = [
  { path: '', redirectTo: '/create-spell', pathMatch: 'full' },
  { path: 'create-spell', component: CreateSpellComponent },
  { path: 'list-spells', component: ListSpellComponent }
];

@NgModule({
  declarations: [
  ],
  imports: [
    AppComponent,
    CreateSpellComponent,
    BrowserModule,
    ReactiveFormsModule,
    ListSpellComponent,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { } 