import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Hero } from './hero';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private messageService: MessageService,
    private http: HttpClient
    ) { }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }
  private heroesURL = 'api/loonies'

  httpOptions = {
    headers: new HttpHeaders ({'Content-Type': 'application/json'})
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error)

      this.log(`${operation} failed: ${error.message}`)

      return of(result as T)
    }
  }
  

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: Heroes are fetched')
    return this.http.get<Hero[]>(this.heroesURL)
    .pipe(
      tap(_ => this.log("fetched heroes")),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    )
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesURL}/${id}`
    return this.http.get<Hero>(url)
    .pipe(
      tap(() => this.log(`fetched hero: ${id}`)),
      catchError(this.handleError<Hero>(`getHero ${id}`)) 
    )
  } 

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesURL, hero, this.httpOptions)
    .pipe(
      tap(_ => {this.log(`Hero updated: ${hero.id}`)}),
      catchError(this.handleError<any>(`updateHero ${hero.id}`))
    )

  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesURL, hero, this.httpOptions)
    .pipe(
      tap((newHero: Hero) => {this.log(`added Hero: ${newHero.id}`)}),
      catchError(this.handleError<Hero>(`addHero`))
    )

  }

  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesURL}/${id}`

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted Hero ${id}`)),
      catchError(this.handleError<Hero>(`deleteHero`))
    )
  }

  // searchHeroes(term: string): Observable<Hero[]> {
  //   if(!term.trim()) {
  //     return of([])
  //   }
  //   return this.http.get<Hero[]>(`${this.heroesURL}/?${term}`)
  //   .pipe(
  //     tap(x => x.length ? 
  //       this.log(`Heros with ${term} have been found`) :
  //       this.log(`No heroes with ${term} have been found`)
  //     ),
  //     catchError(this.handleError<Hero[]>(`searchHero`))
  //     )
  // }

   /* GET heroes whose name contains search term */
   searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesURL}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found heroes matching "${term}"`) :
         this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}