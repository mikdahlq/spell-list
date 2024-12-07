import { Component, OnInit } from '@angular/core';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { SpellBook } from '../models/spellbook.interface';

@Component({
  selector: 'app-spell-book-list',
  templateUrl: './spell-book-list.component.html',
  styleUrls: ['./spell-book-list.component.scss']
})
export class SpellBookListComponent implements OnInit {
  spellBooks: SpellBook[] = [];
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
    } catch (error) {
      console.error('Error loading spell books:', error);
    }
  }

  async createSpellBook(name: string, description: string): Promise<void> {
    if (!this.auth.currentUser) return;

    try {
      const spellBook: SpellBook = {
        name,
        description,
        spells: [], // Initialize with an empty array or add logic to select spells
        userId: this.auth.currentUser.uid
      };

      await addDoc(collection(this.db, 'spellBooks'), spellBook);
      this.loadSpellBooks(); // Refresh the list after creation
    } catch (error) {
      console.error('Error creating spell book:', error);
    }
  }

  castSpellFromBook(spellBookId: string): void {
    // Implement the logic to cast a spell from the spell book
    console.log(`Casting spell from book with ID: ${spellBookId}`);
  }
}
