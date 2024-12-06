import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Spell } from '../../models/spell.interface';

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

  constructor(private fb: FormBuilder, private router: Router) {
    this.spellForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      level: [0, [Validators.required, Validators.min(0)]],
      duration: [0, [Validators.required, Validators.min(0)]],
      school: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.spellForm.valid) {
      const spell: Spell = this.spellForm.value;
      
      // Get existing spells from localStorage
      const existingSpells = localStorage.getItem('spells');
      const spells: Spell[] = existingSpells ? JSON.parse(existingSpells) : [];
      
      // Add new spell
      spells.push(spell);
      
      // Save back to localStorage
      localStorage.setItem('spells', JSON.stringify(spells));
      
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
    }
  }
} 