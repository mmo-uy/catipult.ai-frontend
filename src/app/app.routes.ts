import { Routes } from '@angular/router';
import { AllGoalsComponent } from './components/all-goals/all-goals.component';
import { AddEditGoalComponent } from './components/edit-goal/edit-goal.component';

export const routes: Routes = [
  { path: '', redirectTo: 'goals', pathMatch: 'full' },
  { path: 'goals', component: AllGoalsComponent },
  { path: 'goal/:id', component: AddEditGoalComponent },
];
