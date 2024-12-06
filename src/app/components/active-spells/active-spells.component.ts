import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Spell } from '../../models/spell.interface';

@Component({
  selector: 'app-active-spells',
  templateUrl: './active-spells.component.html',
  styleUrls: ['./active-spells.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ActiveSpellsComponent implements OnInit {
  activeSpells: Spell[] = [];

  ngOnInit(): void {
    this.loadActiveSpells();
  }

  loadActiveSpells(): void {
    const storedActiveSpells = localStorage.getItem('activeSpells');
    this.activeSpells = storedActiveSpells ? JSON.parse(storedActiveSpells) : [];
    // Filter out spells with no duration left
    this.activeSpells = this.activeSpells.filter(spell => spell.duration > 0);
    this.saveActiveSpells();
  }

  decreaseDuration(): void {
    this.activeSpells = this.activeSpells.map(spell => ({
      ...spell,
      duration: Math.max(0, spell.duration - 1)
    })).filter(spell => spell.duration > 0);
    
    this.saveActiveSpells();
  }

  clearAllSpells(): void {
    this.activeSpells = [];
    this.saveActiveSpells();
  }

  private saveActiveSpells(): void {
    localStorage.setItem('activeSpells', JSON.stringify(this.activeSpells));
  }
} 