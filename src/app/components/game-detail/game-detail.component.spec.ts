import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { GameDetailComponent } from './game-detail.component';
import { GameService } from '../../services/game.service';
import { GameDetails } from '../../models/game.model';

describe('GameDetailComponent', () => {
  let component: GameDetailComponent;
  let fixture: ComponentFixture<GameDetailComponent>;
  let mockGameService: jasmine.SpyObj<GameService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockGameService = jasmine.createSpyObj('GameService', ['getGameDetail']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [GameDetailComponent],
      providers: [
        { provide: GameService, useValue: mockGameService },
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of(convertToParamMap({ id: '1' })) }
        }
      ]
    }).compileComponents();

    const mockGameDetails: GameDetails = {
      id: 1,
      title: 'Test Game',
      thumbnail: 'test.jpg',
      short_description: 'A test game',
      description: 'This is a test game',
      game_url: 'http://testDavid.com',
      genre: 'Test',
      platform: 'PC',
      publisher: 'Test Publisher',
      developer: 'Test Developer',
      release_date: '2023-01-01',
      freetogame_profile_url: 'http://testDavid.com/profile',
      status: 'Live',
      screenshots: [{ id: 1, image: 'screenshot1.jpg' }]
    };

    mockGameService.getGameDetail.and.returnValue(of(mockGameDetails));

    fixture = TestBed.createComponent(GameDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load game details', (done) => {
    component.game$.subscribe(game => {
      expect(game.title).toBe('Test Game');
      expect(game.status).toBe('Live');
      expect(game.screenshots.length).toBe(1);
      done();
    });
  });

  it('should navigate back on goBack()', () => {
    component.goBack();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/']);
  });
});