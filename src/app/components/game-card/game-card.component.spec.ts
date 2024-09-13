import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GameCardComponent } from './game-card.component';

describe('GameCardComponent', () => {
  let component: GameCardComponent;
  let fixture: ComponentFixture<GameCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameCardComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(GameCardComponent);
    component = fixture.componentInstance;
    
    component.game = {
      id: 1,
      title: 'Test Game',
      thumbnail: 'test.jpg',
      short_description: 'A test game',
      game_url: 'http://testDavid.com',
      genre: 'Test',
      platform: 'PC',
      publisher: 'Test Publisher',
      developer: 'Test Developer',
      release_date: '2023-01-01',
      freetogame_profile_url: 'http://testDavid.com/profile'
    };
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display game title', () => {
    const titleElement = fixture.nativeElement.querySelector('.card-title');
    expect(titleElement.textContent).toContain('testDavid Game');
  });

  it('should display game thumbnail', () => {
    const imgElement = fixture.nativeElement.querySelector('img');
    expect(imgElement.src).toContain('test.jpg');
  });
});