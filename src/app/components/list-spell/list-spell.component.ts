import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Spell } from '../../models/spell.interface';
import { SpellService } from '../../services/spell.service';
import { SpellBookService } from '../../services/spellbook.service';

@Component({
  selector: 'app-list-spell',
  templateUrl: './list-spell.component.html',
  styleUrls: ['./list-spell.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ListSpellComponent implements OnInit {
  spells: Spell[] = [];
  successMessage: string = '';
  selectedSpells: Spell[] = [];

  constructor(private spellService: SpellService, private spellBookService: SpellBookService) {}

  ngOnInit(): void {
    this.loadSpells();
  }

  async loadSpells(): Promise<void> {
    this.spells = await this.spellService.loadSpells();
  }

  async castSpell(spell: Spell): Promise<void> {
    await this.spellService.castSpell(spell);
    this.successMessage = `${spell.name} has been cast!`;
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }

  toggleSpellSelection(spell: Spell): void {
    const index = this.selectedSpells.findIndex(s => s.id === spell.id);
    if (index > -1) {
      this.selectedSpells.splice(index, 1);
    } else {
      this.selectedSpells.push(spell);
    }
  }

  async createSpellBook(name: string, description: string): Promise<void> {
    const spellIds = this.selectedSpells.map(spell => spell.id).filter((id): id is string => id !== undefined);
    await this.spellBookService.createSpellBook(name, description, spellIds);
    this.selectedSpells = [];
  }
} 