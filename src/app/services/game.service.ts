import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Game, GameDetails } from '../models/game.model';
import { environment } from '../../environments/environment';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getGames(filters?: any): Observable<Game[]> {
    return this.getGenres().pipe(
      switchMap(genres => this.getPlatforms().pipe(
        switchMap(platforms => {
          let params = new HttpParams();
          if (filters) {
            Object.keys(filters).forEach(key => {
              if (filters[key] && (genres.includes(filters[key]) || platforms.includes(filters[key]))) {
                params = params.append(key, filters[key]);
              }
            });
          }
          return this.http.get<Game[]>(`${this.apiUrl}/games`, { params });
        })
      ))
    );
  }

  getGameDetail(id: number): Observable<GameDetails> {
    return this.http.get<GameDetails>(`${this.apiUrl}/game`, { 
      params: new HttpParams().set('id', id.toString()) 
    }).pipe(
      catchError(this.handleError<GameDetails>('getGameDetail'))
    );
  }

  getGenres(): Observable<string[]> {
    return of(['mmorpg', 'shooter', 'strategy', 'moba', 'racing', 'sports', 'social', 'sandbox', 'open-world', 'survival', 'pvp', 'pve', 'pixel', 'voxel', 'zombie', 'turn-based', 'first-person', 'third-Person', 'top-down', 'tank', 'space', 'sailing', 'side-scroller', 'superhero', 'permadeath', 'card', 'battle-royale', 'mmo', 'mmofps', 'mmotps', '3d', '2d', 'anime', 'fantasy', 'sci-fi', 'fighting', 'action-rpg', 'action', 'military', 'martial-arts', 'flight', 'low-spec', 'tower-defense', 'horror', 'mmorts']);
  }

  getPlatforms(): Observable<string[]> {
    return of(['pc', 'browser', 'all']);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}