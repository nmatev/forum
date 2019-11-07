import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserRegister } from 'src/app/models/user-register';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UserLogin } from 'src/app/models/user-login';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isLoggedInSubject$ = new BehaviorSubject<boolean>(this.isUserAuthenticated());
  private readonly userSubject$ = new BehaviorSubject<string | null>(this.username); // todo

  public constructor(
    private readonly http: HttpClient,
    private readonly storage: StorageService,
  ) { }

  // Encapsulation - Only observable can listening
  public get isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject$.asObservable();
  }

  public register(user: UserRegister): Observable<any> {
    return this.http.post('http://localhost:3000/api/register', user);
  }

  public login(user: UserLogin): Observable<any> {
    // tap() create side efect without manipulate original request/response
    return this.http.post('http://localhost:3000/api/login', user)
      .pipe(tap((data) => {
        this.storage.setItem('token', data.token); // add token to local storage
        this.isLoggedInSubject$.next(true);
      }));
  }

  public logout(): Observable<any> {
    return this.http.delete('http://localhost:3000/api/session')
      .pipe(tap(() => {
        this.storage.removeItem('token');
        this.isLoggedInSubject$.next(false);
      }));
  }

  private isUserAuthenticated(): boolean {
    return !!this.storage.getItem('token');
  }

  private get username(): string | null { // todo
    const token = this.storage.getItem('token');
    const username = this.storage.getItem('name') || '';
    if (token) {
      return username;
    }
    return null;
  }

  public get user$() {
    return this.userSubject$.asObservable();
  }

}
