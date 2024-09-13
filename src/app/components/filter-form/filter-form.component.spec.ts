import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterFormComponent } from './filter-form.component';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';
import { of } from 'rxjs';

describe('FilterFormComponent', () => {
  let component: FilterFormComponent;
  let fixture: ComponentFixture<FilterFormComponent>;
  let mockGameService: jasmine.SpyObj<GameService>;

  beforeEach(async () => {
    mockGameService = jasmine.createSpyObj('GameService', ['getGenres', 'getPlatforms']);
    mockGameService.getGenres.and.returnValue(of(['Action', 'Adventure']));
    mockGameService.getPlatforms.and.returnValue(of(['PC', 'Browser']));

    await TestBed.configureTestingModule({
      imports: [FilterFormComponent, FormsModule],
      providers: [{ provide: GameService, useValue: mockGameService }]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load genres and platforms on init', () => {
    expect(mockGameService.getGenres).toHaveBeenCalled();
    expect(mockGameService.getPlatforms).toHaveBeenCalled();
    expect(component.genres).toEqual(['Action', 'Adventure']);
    expect(component.platforms).toEqual(['PC', 'Browser']);
  });

  it('should emit filter changes', () => {
    spyOn(component.filterChange, 'emit');
    component.filters = { genre: 'Action', platform: 'PC' };
    component.onSubmit();
    expect(component.filterChange.emit).toHaveBeenCalledWith({ genre: 'Action', platform: 'PC' });
  });
});