import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  public constructor(private readonly http: HttpClient) { }
  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/api');
  }
}
