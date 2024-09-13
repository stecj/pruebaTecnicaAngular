import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { GameCardComponent } from '../game-card/game-card.component';
import { FilterFormComponent } from '../filter-form/filter-form.component';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, GameCardComponent, FilterFormComponent],
  template: `
    <app-filter-form (filterChange)="applyFilter($event)"></app-filter-form>
    <div class="row mt-4">
      <div *ngFor="let game of games" class="col-md-4 mb-4">
        <app-game-card [game]="game"></app-game-card>
      </div>
    </div>
  `,
  styles: []
})
export class GameListComponent implements OnInit {
  games: Game[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.loadGames();
  }

  loadGames(filters?: any) {
    this.gameService.getGames(filters).subscribe(
      (games) => {
        this.games = games;
      },
      (error) => {
        console.error('Error fetching games:', error);
      }
    );
  }

  applyFilter(filters: any) {
    this.loadGames(filters);
  }
}