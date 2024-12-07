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

  // Firebase configuration
  private firebaseConfig = {
    apiKey: "AIzaSyC3idCCsPNwfJME8Nun6FpO7oHmSu7W7N4",
    authDomain: "spell-list-b9e6d.firebaseapp.com",
    projectId: "spell-list-b9e6d",
    storageBucket: "spell-list-b9e6d.firebasestorage.app",
    messagingSenderId: "212382812841",
    appId: "1:212382812841:web:21c1861149e3955ae237b8"
  };

  private auth: any;
  private provider: any;

  constructor(private router: Router) {
    // Initialize Firebase
    const app = initializeApp(this.firebaseConfig);
    this.auth = getAuth(app);
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