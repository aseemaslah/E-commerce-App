import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    // check localStorage during app load
  private loggedIn = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));

  // components subscribe to this
  isLoggedIn$ = this.loggedIn.asObservable();

  // call this after successful login
  setLogin(token: string) {
    localStorage.setItem('token', token);
    this.loggedIn.next(true);
  }

  // call this when logging out
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loggedIn.next(false);
  }
}
