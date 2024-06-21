import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInUser: any;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.loggedInUser = JSON.parse(storedUser);
      }
    }
  }

  login(username: string, password: string): Observable<any> {
    return this.http.get<any>('assets/json/Users.json').pipe(
      tap((users: any[]) => {
        const user = users.find(
          (u) => u.username === username && u.password === password
        );
        if (user) {
          this.loggedInUser = user;
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('currentUser', JSON.stringify(user));
          }
        }
      })
    );
  }

  logout(): void {
    this.loggedInUser = null;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
    }
  }

  get currentUser(): any {
    return this.loggedInUser;
  }

  isAuthenticated(): boolean {
    return !!this.currentUser;
  }
}
