import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CreateSpellComponent } from './components/create-spell/create-spell.component';
import { ListSpellComponent } from './components/list-spell/list-spell.component';

@NgModule({
  declarations: [
  ],
  imports: [
    AppComponent,
    CreateSpellComponent,
    BrowserModule,
    ReactiveFormsModule,
    ListSpellComponent,
    RouterModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { } 