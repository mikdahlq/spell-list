import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Spell } from '../../models/spell.interface';

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

  ngOnInit(): void {
    this.loadSpells();
  }

  loadSpells(): void {
    const storedSpells = localStorage.getItem('spells');
    if (storedSpells) {
      this.spells = JSON.parse(storedSpells);
    }
  }

  castSpell(spell: Spell): void {
    // Get current active spells
    const storedActiveSpells = localStorage.getItem('activeSpells');
    const activeSpells: Spell[] = storedActiveSpells ? JSON.parse(storedActiveSpells) : [];
    
    // Add the spell to active spells
    activeSpells.push({...spell});
    
    // Save back to localStorage
    localStorage.setItem('activeSpells', JSON.stringify(activeSpells));
    
    // Show success message
    this.successMessage = `${spell.name} has been cast!`;
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }
} 