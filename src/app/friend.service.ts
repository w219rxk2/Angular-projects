import { Injectable } from '@angular/core';
import { FRIENDS } from './mock-friends';
import { Friend} from './Friend';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class FriendService {

  private friendsUrl = 'api/heroes';  // URL to web api
  constructor( private http: HttpClient,
               private messageService: MessageService) { }
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  /** GET heroes from the server */
  getFriends (): Observable<Friend[]> {
    return this.http.get<Friend[]>(this.friendsUrl)
      .pipe(
        tap(friends => this.log(`fetched heroes`)),
        catchError(this.handleError('getFriends', []))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getFriend(id: number): Observable<Friend> {
    const url = `${this.friendsUrl}/${id}`;
    return this.http.get<Friend>(url).pipe(
      tap(_ => this.log(`fetched Friend id=${id}`)),
      catchError(this.handleError<Friend>(`getFriend id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateFriend (friend: Friend): Observable<any> {
    return this.http.put(this.friendsUrl, friend, httpOptions).pipe(
      tap(_ => this.log(`updated friend id=${friend.id}`)),
      catchError(this.handleError<any>('updateFriend'))
    );
  }

  /** POST: add a new hero to the server */
  addFriend (friend: string): Observable<Friend> {
    return this.http.post<Friend>(this.friendsUrl, friend, httpOptions).pipe(
      tap((friendadd: Friend) => this.log(`added hero w/ id=${friendadd.id}`)),
      catchError(this.handleError<Friend>('addFriend'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteFriend (friend: Friend | number): Observable<Friend> {
    const id = typeof friend === 'number' ? friend : friend.id;
    const url = `${this.friendsUrl}/${id}`;

    return this.http.delete<Friend>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted friend id=${id}`)),
      catchError(this.handleError<Friend>('deleteFriend'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  /*getFriends(): Observable<Friend[]> {
    this.log('FriendService: Friends Fetched');
    return of(FRIENDS);
  }*/
  /*getFriend(id: number): Observable<Friend> {
    // Todo: send the message _after_ fetching the hero
    // Note the backticks ( ` ) that define a JavaScript template literal for embedding the id.
    this.log(`HeroService: fetched hero id=${id}`);
    return of(FRIENDS.find(hero => hero.id === id));
  }*/
}
