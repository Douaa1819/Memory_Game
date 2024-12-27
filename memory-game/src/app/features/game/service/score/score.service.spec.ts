import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreService } from './score.service';

describe('ScoreComponent', () => {
  let component: ScoreService;
  let fixture: ComponentFixture<ScoreService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScoreService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScoreService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
