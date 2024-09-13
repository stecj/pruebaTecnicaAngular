import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { AsyncPipe, NgIf, NgFor } from '@angular/common';
import { GameService } from '../../services/game.service';
import { GameDetails } from '../../models/game.model';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor],
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.scss']
})
export class GameDetailComponent {
  game$: Observable<GameDetails>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private gameService: GameService
  ) {
    this.game$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        return this.gameService.getGameDetail(id);
      })
    );
  }

  goBack() {
    this.router.navigate(['/']);
  }
}