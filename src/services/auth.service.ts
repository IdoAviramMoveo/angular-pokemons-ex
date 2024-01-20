import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storageKey = 'isLoggedIn';
  private readonly authEmail = 'demo@skills.co.il';

  constructor() {}

  login(email: string): boolean {
    if (email === this.authEmail) {
      localStorage.setItem(this.storageKey, 'true');
      return true;
    } else {
      localStorage.removeItem(this.storageKey);
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.storageKey) === 'true';
  }
}
