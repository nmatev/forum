import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable()
export class SearchService {
  private readonly searchSubject$ = new ReplaySubject<string>(1);

  public get search$(): Observable<string> {
    return this.searchSubject$.asObservable();
  }

  public emitSearch(searchInput: string): void {
    this.searchSubject$.next(searchInput);
  }
}
