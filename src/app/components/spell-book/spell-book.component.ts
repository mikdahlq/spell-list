import { Component, OnInit, Input } from '@angular/core';
import { SpellBookService } from '../../services/spellbook.service';
import { SpellService } from '../../services/spell.service';
import { SpellBook } from '../../models/spellbook.interface';
import { Spell } from '../../models/spell.interface';

@Component({
  selector: 'app-spell-book',
  templateUrl: './spell-book.component.html',
  styleUrls: ['./spell-book.component.scss']
})
export class SpellBookComponent implements OnInit {
  @Input() spellBook!: SpellBook;
  spells: Spell[] = [];
  allSpells: Spell[] = [];
  selectedSpellIds: string[] = [];

  constructor(private spellBookService: SpellBookService, private spellService: SpellService) {}

  ngOnInit(): void {
    this.loadSpellsForBook(this.spellBook.id!);
    this.loadAllSpells();
  }

  async loadAllSpells(): Promise<void> {
    this.allSpells = await this.spellService.loadSpells();
  }

  async loadSpellsForBook(spellBookId: string): Promise<void> {
    const allSpells = await this.spellService.loadSpells();
    this.spells = allSpells.filter(spell => this.spellBook.spells.includes(spell.id!));
  }

  async castSpell(spell: Spell): Promise<void> {
    await this.spellService.castSpell(spell);
    console.log(`${spell.name} has been cast!`);
  }

  toggleSpellSelection(spellId: string): void {
    const index = this.selectedSpellIds.indexOf(spellId);
    if (index > -1) {
      this.selectedSpellIds.splice(index, 1);
    } else {
      this.selectedSpellIds.push(spellId);
    }
  }

  async addSpellsToBook(): Promise<void> {
    this.spellBook.spells = [...new Set([...this.spellBook.spells, ...this.selectedSpellIds])];
    await this.spellBookService.createSpellBook(this.spellBook.name, this.spellBook.description, this.spellBook.spells);
    await this.loadSpellsForBook(this.spellBook.id!);
    this.selectedSpellIds = []; // Clear selection after adding
  }
}