import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, throwError } from 'rxjs';
import { Options, SimpsonsCharacterDetail, SimpsonsResponse } from '../interfaces/simpsons-interfaces';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SimpsonSservice {
  private http = inject(HttpClient);
  private readonly API_URL = environment.apiUrl;

  getCharacters(page: number = 1): Observable<SimpsonsResponse> {
    return this.http.get<SimpsonsResponse>(`${this.API_URL}/characters?page=${page}`).pipe(
      map(res => res),
      catchError(err => {
        console.error('Error al obtener personajes', err);
        return of({ count: 0, next: null, prev: null, pages: 0, results: [] });
      })
    );
  }

  getCharacterById(id: number): Observable<SimpsonsCharacterDetail | null> {
    return this.http.get<SimpsonsCharacterDetail>(`${this.API_URL}/characters/${id}`).pipe(
      catchError(err => {
        console.error('Personaje no encontrado', err);
        return of(null);
      })
    );
  }

  getCharactersOptions(options: Options): Observable<SimpsonsResponse> {
    return this.http.get<SimpsonsResponse>(`${this.API_URL}/characters?page=${options.offset}`).pipe(
      delay(3500),
      map(res => res),
      catchError(err => {
        console.error('Error al obtener personajes', err);
        return of({ count: 0, next: null, prev: null, pages: 0, results: [] });
      })
    );
  }
 
  constructor() { }

}
