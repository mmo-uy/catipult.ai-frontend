import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGoalComponent } from './new-goal.component';

describe('NewGoalComponent', () => {
  let component: NewGoalComponent;
  let fixture: ComponentFixture<NewGoalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewGoalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
