import { Injectable } from '@angular/core';
import { getFirestore, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Spell } from '../models/spell.interface';

@Injectable({
  providedIn: 'root'
})
export class SpellService {
  private db = getFirestore();
  private auth = getAuth();

  async loadSpells(): Promise<Spell[]> {
    if (!this.auth.currentUser) return [];

    try {
      const spellsRef = collection(this.db, 'spells');
      const q = query(spellsRef, where('userId', '==', this.auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Spell[];
    } catch (error) {
      console.error('Error loading spells:', error);
      return [];
    }
  }

  async castSpell(spell: Spell): Promise<void> {
    if (!this.auth.currentUser) return;

    try {
      await addDoc(collection(this.db, 'activeSpells'), {
        ...spell,
        userId: this.auth.currentUser.uid,
        castAt: new Date()
      });
    } catch (error) {
      console.error('Error casting spell:', error);
    }
  }
} 