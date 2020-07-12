import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

const USER_AUTH_API_URL = 'http://localhost:3000/api/';

@Injectable()
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  public currentToken: string;

  constructor(private http: HttpClient, private _router: Router) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentToken = localStorage.getItem('currentToken');
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(dataLogin) {
    const { email, password } = dataLogin;
    return this.http
      .post<any>(USER_AUTH_API_URL + 'login', { email, password })
      .pipe(
        map((response: any) => {
          const { user, token } = response;
          if (user && token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('currentToken', token);
            this.currentUserSubject.next(user);
          }
          return true;
        })
      );
  }

  register(dataLogin) {
    const { email, password, name } = dataLogin;
    return this.http.post<any>(USER_AUTH_API_URL + 'signup', {
      email,
      password,
      name,
    });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
