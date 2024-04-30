import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleGoalComponent } from './single-goal.component';

describe('SingleGoalComponent', () => {
  let component: SingleGoalComponent;
  let fixture: ComponentFixture<SingleGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleGoalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
