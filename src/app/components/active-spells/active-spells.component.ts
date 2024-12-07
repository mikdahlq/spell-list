import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Spell } from '../../models/spell.interface';
import { 
  getFirestore, 
  collection, 
  query, 
  where, 
  getDocs, 
  deleteDoc,
  doc,
  writeBatch
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-active-spells',
  templateUrl: './active-spells.component.html',
  styleUrls: ['./active-spells.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class ActiveSpellsComponent implements OnInit {
  activeSpells: (Spell & { id: string })[] = [];
  private db = getFirestore();
  private auth = getAuth();

  ngOnInit(): void {
    this.loadActiveSpells();
  }

  async loadActiveSpells(): Promise<void> {
    if (!this.auth.currentUser) return;

    try {
      const activeSpellsRef = collection(this.db, 'activeSpells');
      const q = query(activeSpellsRef, where('userId', '==', this.auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      
      this.activeSpells = querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        } as Spell & { id: string }))
        .filter(spell => spell.duration > 0);
    } catch (error) {
      console.error('Error loading active spells:', error);
    }
  }

  async decreaseDuration(): Promise<void> {
    if (!this.auth.currentUser) return;

    try {
      const batch = writeBatch(this.db);

      this.activeSpells.forEach(spell => {
        const newDuration = Math.max(0, spell.duration - 1);
        if (newDuration === 0) {
          // Delete spells with no duration left
          const spellRef = doc(this.db, 'activeSpells', spell.id);
          batch.delete(spellRef);
        }
      });

      await batch.commit();
      await this.loadActiveSpells();
    } catch (error) {
      console.error('Error decreasing duration:', error);
    }
  }

  async clearAllSpells(): Promise<void> {
    if (!this.auth.currentUser) return;

    try {
      const batch = writeBatch(this.db);

      this.activeSpells.forEach(spell => {
        const spellRef = doc(this.db, 'activeSpells', spell.id);
        batch.delete(spellRef);
      });

      await batch.commit();
      this.activeSpells = [];
    } catch (error) {
      console.error('Error clearing spells:', error);
    }
  }
} 