import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    // Ensure localStorage is accessed only in the browser
    if (typeof window !== 'undefined' && localStorage.getItem('userToken')) {
      return true; // User is logged in
    } else {
      this.router.navigate(['/login']); // Redirect to login if not logged in
      return false;
    }
  }
}