import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Spell } from '../../models/spell.interface';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-create-spell',
  templateUrl: './create-spell.component.html',
  styleUrls: ['./create-spell.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class CreateSpellComponent {
  spellForm: FormGroup;
  successMessage: string = '';
  private db = getFirestore();
  private auth = getAuth();

  constructor(private fb: FormBuilder, private router: Router) {
    this.spellForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      level: [0, [Validators.required, Validators.min(0)]],
      duration: [0, [Validators.required, Validators.min(0)]],
      school: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.spellForm.valid && this.auth.currentUser) {
      try {
        const spell: Spell = {
          ...this.spellForm.value,
          userId: this.auth.currentUser.uid,
          createdAt: new Date()
        };
        
        // Add spell to Firestore
        await addDoc(collection(this.db, 'spells'), spell);
        
        // Show success message and reset form
        this.successMessage = 'Spell created successfully!';
        this.spellForm.reset({
          level: 0,
          duration: 0
        });
        
        // Navigate to spell list after a short delay
        setTimeout(() => {
          this.router.navigate(['/list-spells']);
        }, 1500);
      } catch (error) {
        console.error('Error creating spell:', error);
      }
    }
  }
} 