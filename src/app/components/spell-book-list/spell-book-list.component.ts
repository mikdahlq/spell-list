import { Component, OnInit } from '@angular/core';
import { SpellBookService } from '../../services/spellbook.service';
import { SpellBook } from '../../models/spellbook.interface';
import { SpellBookComponent } from '../spell-book/spell-book.component';

@Component({
  selector: 'app-spell-book-list',
  templateUrl: './spell-book-list.component.html',
  styleUrls: ['./spell-book-list.component.scss'],
  imports: [SpellBookComponent]
})
export class SpellBookListComponent implements OnInit {
  spellBooks: SpellBook[] = [];

  constructor(private spellBookService: SpellBookService) {}

  ngOnInit(): void {
    this.loadSpellBooks();
  }

  async loadSpellBooks(): Promise<void> {
    this.spellBooks = await this.spellBookService.loadSpellBooks();
  }

  async createSpellBook(name: string, description: string): Promise<void> {
    await this.spellBookService.createSpellBook(name, description, []);
    this.loadSpellBooks();
  }

  castSpellFromBook(spellBookId: string): void {
    console.log(`Casting spell from book with ID: ${spellBookId}`);
  }
}
