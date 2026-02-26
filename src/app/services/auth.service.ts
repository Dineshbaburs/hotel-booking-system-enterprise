import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  
  // Holds the current user state
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    // Check if user is logged in (from localStorage)
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  // 1. REGISTER
  register(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // 2. LOGIN
  login(email: string, password: string): Observable<User | undefined> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`)
      .pipe(map(users => {
        if (users.length > 0) {
          const user = users[0];
          // Save session
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        }
        return undefined;
      }));
  }

  // 3. LOGOUT
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  // Helper
  getCurrentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
}