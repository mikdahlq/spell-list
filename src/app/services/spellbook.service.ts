import { Injectable } from '@angular/core';
import { getFirestore, collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { SpellBook } from '../models/spellbook.interface';

@Injectable({
  providedIn: 'root'
})
export class SpellBookService {
  private db = getFirestore();
  private auth = getAuth();

  async loadSpellBooks(): Promise<SpellBook[]> {
    if (!this.auth.currentUser) return [];

    try {
      const spellBooksRef = collection(this.db, 'spellBooks');
      const q = query(spellBooksRef, where('userId', '==', this.auth.currentUser.uid));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SpellBook[];
    } catch (error) {
      console.error('Error loading spell books:', error);
      return [];
    }
  }

  async createSpellBook(name: string, description: string, spells: string[]): Promise<void> {
    if (!this.auth.currentUser) return;

    try {
      const spellBook: SpellBook = {
        name,
        description,
        spells,
        userId: this.auth.currentUser.uid
      };

      await addDoc(collection(this.db, 'spellBooks'), spellBook);
    } catch (error) {
      console.error('Error creating spell book:', error);
    }
  }
} 