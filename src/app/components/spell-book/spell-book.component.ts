import { Component, OnInit } from '@angular/core';
import { SpellBook } from '../../models/spellbook.interface';
import { Spell } from '../../models/spell.interface';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-spell-book',
  templateUrl: './spell-book.component.html',
  styleUrls: ['./spell-book.component.scss']
})
export class SpellBookComponent implements OnInit {
  spellBooks: SpellBook[] = [];
  spells: { [key: string]: Spell[] } = {}; // Map of spellBookId to spells
  private db = getFirestore();
  private auth = getAuth();

  ngOnInit(): void {
    this.loadSpellBooks();
  }

  async loadSpellBooks(): Promise<void> {
    if (!this.auth.currentUser) return;

    try {
      const spellBooksRef = collection(this.db, 'spellBooks');
      const querySnapshot = await getDocs(spellBooksRef);
      
      this.spellBooks = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SpellBook[];

      // Load spells for each spell book
      for (const spellBook of this.spellBooks) {
        await this.loadSpellsForBook(spellBook.id!);
      }
    } catch (error) {
      console.error('Error loading spell books:', error);
    }
  }

  async loadSpellsForBook(spellBookId: string): Promise<void> {
    try {
      const spellsRef = collection(this.db, 'spells');
      const querySnapshot = await getDocs(spellsRef);
      
      this.spells[spellBookId] = querySnapshot.docs
        .filter(doc => this.spellBooks.find(book => book.id === spellBookId)?.spells.includes(doc.id))
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Spell[];
    } catch (error) {
      console.error(`Error loading spells for book ${spellBookId}:`, error);
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
      console.log(`${spell.name} has been cast!`);
    } catch (error) {
      console.error('Error casting spell:', error);
    }
  }
}