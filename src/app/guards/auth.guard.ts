import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { getApps } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const apps = getApps();
    if (apps.length === 0) {
      // Firebase app is not initialized
      this.router.navigate(['/login']);
      return false;
    }

    const auth = getAuth();
    if (!auth.currentUser) {
      // User is not authenticated
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
} 