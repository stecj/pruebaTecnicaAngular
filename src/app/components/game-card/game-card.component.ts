import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../../models/game.model';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [],
  template: `
    <div class="card">
      <img [src]="game.thumbnail" class="card-img-top" [alt]="game.title">
      <div class="card-body">
        <h5 class="card-title">{{ game.title }}</h5>
        <p class="card-text">{{ game.short_description }}</p>
        <button (click)="viewDetails()" class="btn btn-primary">View Details</button>
      </div>
    </div>
  `
})
export class GameCardComponent {
  @Input() game!: Game;

  constructor(private router: Router) {}

  viewDetails() {
    this.router.navigate(['/game', this.game.id]);
  }
}