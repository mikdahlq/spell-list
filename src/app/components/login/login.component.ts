import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider,
  onAuthStateChanged 
} from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class LoginComponent {
  isLoading = false;
  error: string | null = null;

  private auth: any;
  private provider: any;

  constructor(private router: Router) {
    this.auth = getAuth();
    this.provider = new GoogleAuthProvider();

    // Check if user is already logged in
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.router.navigate(['/list-spells']);
      }
    });
  }

  async loginWithGoogle() {
    this.isLoading = true;
    this.error = null;

    try {
      const result = await signInWithPopup(this.auth, this.provider);
      const user = result.user;
      
      // Store user info in localStorage
      localStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      }));

      // Navigate to spell list
      this.router.navigate(['/list-spells']);
    } catch (error: any) {
      this.error = error.message;
      console.error('Login error:', error);
    } finally {
      this.isLoading = false;
    }
  }
} 