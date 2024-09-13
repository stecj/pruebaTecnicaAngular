import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-filter-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()" class="mb-4">
      <div class="row">
        <div class="col-md-4">
          <select [(ngModel)]="filters.genre" name="genre" class="form-control">
            <option value="">Select Genre</option>
            <option *ngFor="let genre of genres" [value]="genre">{{genre}}</option>
          </select>
        </div>
        <div class="col-md-4">
          <select [(ngModel)]="filters.platform" name="platform" class="form-control">
            <option value="">Select Platform</option>
            <option *ngFor="let platform of platforms" [value]="platform">{{platform}}</option>
          </select>
        </div>
        <div class="col-md-4">
          <button type="submit" class="btn btn-primary w-100">Apply Filters</button>
        </div>
      </div>
    </form>
  `,
  styles: []
})
export class FilterFormComponent implements OnInit {
  @Output() filterChange = new EventEmitter<any>();

  filters = {
    genre: '',
    platform: ''
  };

  genres: string[] = [];
  platforms: string[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.gameService.getGenres().subscribe(genres => this.genres = genres);
    this.gameService.getPlatforms().subscribe(platforms => this.platforms = platforms);
  }

  onSubmit() {
    this.filterChange.emit(this.filters);
  }
}