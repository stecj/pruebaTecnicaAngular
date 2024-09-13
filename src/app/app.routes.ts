import { Routes } from '@angular/router';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';

export const routes: Routes = [
  { path: '', component: GameListComponent },
  { path: 'game/:id', component: GameDetailComponent },
  { path: '**', redirectTo: '' }
];