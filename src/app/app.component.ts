import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CreateSpellComponent } from './components/create-spell/create-spell.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterOutlet]
})
export class AppComponent {
  title = 'Spell Creator';
}
