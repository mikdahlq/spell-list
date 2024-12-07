import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Spell } from '../../models/spell.interface';
import { getFirestore, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { SpellBook } from '../../models/spellbook.interface';
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
  private db = getFirestore();
  private auth = getAuth();
  selectedSpells: Spell[] = [];

  ngOnInit(): void {
    this.loadSpells();
  }

  async loadSpells(): Promise<void> {
    if (!this.auth.currentUser) return;

    try {
      const spellsRef = collection(this.db, 'spells');
      const q = query(spellsRef, where('userId', '==', this.auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      
      this.spells = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Spell[];
    } catch (error) {
      console.error('Error loading spells:', error);
    }
  }

  async castSpell(spell: Spell): Promise<void> {
    if (!this.auth.currentUser) return;

    try {
      // Add the spell to active spells collection
      await addDoc(collection(this.db, 'activeSpells'), {
        ...spell,
        userId: this.auth.currentUser.uid,
        castAt: new Date()
      });
      
      // Show success message
      this.successMessage = `${spell.name} has been cast!`;
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    } catch (error) {
      console.error('Error casting spell:', error);
    }
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
    if (!this.auth.currentUser) return;

    try {
      const spellBook: SpellBook = {
        name,
        description,
        spells: this.selectedSpells
          .map(spell => spell.id)
          .filter((id): id is string => id !== undefined),
        userId: this.auth.currentUser.uid
      };

      await addDoc(collection(this.db, 'spellBooks'), spellBook);
      this.selectedSpells = []; // Clear selection after creation
    } catch (error) {
      console.error('Error creating spell book:', error);
    }
  }
} 