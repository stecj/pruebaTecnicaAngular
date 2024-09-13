import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameListComponent } from './game-list.component';
import { GameService } from '../../services/game.service';
import { of } from 'rxjs';
import { FilterFormComponent } from '../filter-form/filter-form.component';
import { GameCardComponent } from '../game-card/game-card.component';

describe('GameListComponent', () => {
  let component: GameListComponent;
  let fixture: ComponentFixture<GameListComponent>;
  let mockGameService: jasmine.SpyObj<GameService>;

  beforeEach(async () => {
    mockGameService = jasmine.createSpyObj('GameService', ['getGames', 'getGenres', 'getPlatforms']);
    mockGameService.getGames.and.returnValue(of([]));
    mockGameService.getGenres.and.returnValue(of(['Action', 'Adventure']));
    mockGameService.getPlatforms.and.returnValue(of(['PC', 'Browser']));

    await TestBed.configureTestingModule({
      imports: [GameListComponent, FilterFormComponent, GameCardComponent],
      providers: [{ provide: GameService, useValue: mockGameService }]
    }).compileComponents();

    fixture = TestBed.createComponent(GameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load games on init', () => {
    expect(mockGameService.getGames).toHaveBeenCalled();
  });

  it('should apply filters', () => {
    const filters = { platform: 'pc', genre: 'mmo' };
    component.applyFilter(filters);
    expect(mockGameService.getGames).toHaveBeenCalledWith(filters);
  });
});