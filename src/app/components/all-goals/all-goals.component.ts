import { Component, OnInit, ViewChild } from '@angular/core';
import { SingleGoalComponent } from '../single-goal/single-goal.component';
import { Goal } from '../../../../types';
import { GoalService } from '../../services/goal.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { AddModalComponent } from '../add-modal/add-modal.component';
import { extractAction, extractFrequency } from '../../../utils/goalValidator';
import { FormsModule } from '@angular/forms';
import { CATEGORIES } from '../../../utils/constants';
@Component({
  selector: 'app-all-goals',
  standalone: true,
  imports: [
    FormsModule,
    SingleGoalComponent,
    RouterLink,
    DeleteModalComponent,
    AddModalComponent,
  ],
  templateUrl: './all-goals.component.html',
  styleUrl: './all-goals.component.scss',
})
export class AllGoalsComponent implements OnInit {
  goals?: Goal[];
  filteredGoals?: Goal[];
  goalId?: string;
  searchQuery: string = '';
  selectedCategory: string = '';
  categoriesList: Array<string> = CATEGORIES;
  filtersApplied: boolean = false;
  sortDirection: 'asc' | 'desc' = 'asc';
  showOnlyCompleted: boolean = false;
  sortBy: 'title' | 'category' | 'deadline' = 'title';
  @ViewChild(DeleteModalComponent) deleteModal!: DeleteModalComponent;
  @ViewChild(AddModalComponent) addModal!: AddModalComponent;

  constructor(
    private goalService: GoalService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.retrieveGoals();
  }
  setFiltersApplied(): void {
    this.filtersApplied =
      this.selectedCategory !== '' || this.searchQuery !== '';
  }
  retrieveGoals(): void {
    this.goalService.getAll().subscribe({
      next: (data: Goal[]) => {
        this.goals = data;
        this.filteredGoals = [...this.goals];
      },
      error: (e: any) => console.error(e),
    });
  }
  onDeleteGoal(goalId: string): void {
    // SHOW MODAL
    this.deleteModal.openModal();
    this.goalId = goalId;
  }

  onCancel() {
    this.toastr.warning('Cancelled action', 'Attention!');
    this.goalId = '';
  }
  onConfirm() {
    this.goalService.delete(this.goalId!).subscribe({
      next: (res) => {
        this.toastr.success('Deleted successfully!', 'Attention!');
        this.retrieveGoals();
      },
      error: (e) => console.error(e),
    });
  }

  onSave() {
    const { description, completed, title, category, deadline } =
      this.addModal.goalForm.value;
    const action = extractAction(description);
    const frequency = extractFrequency(description);
    this.addModal.goalForm.reset();
    this.goalService
      .create({
        category: category,
        completed: completed!,
        description: description!,
        action: action!,
        frequency: frequency!,
        title: title!,
        deadline: new Date(deadline),
      })
      .subscribe({
        next: (res) => {
          this.toastr.success('Created successfully!', 'Success!');
          this.addModal.closeModal();
          this.retrieveGoals();
        },
        error: (e) => {
          // TODO show alert
          console.error(e);
        },
      });
  }
  sortGoalsBy(criteria: keyof Goal): void {
    this.filteredGoals!.sort((a, b) => {
      if (a[criteria]! < b[criteria]!) return -1;
      if (a[criteria]! > b[criteria]!) return 1;
      return 0;
    });
    this.setFiltersApplied();
  }

  filterGoalsByCategory(event: Event): void {
    const category = (event.target as HTMLInputElement).value;
    this.selectedCategory = category;
    this.filteredGoals = this.goals!.filter(
      (goal) => !category || goal.category === category
    );
    this.setFiltersApplied();
  }

  searchGoals(event: Event): void {
    const query = (event.target as HTMLInputElement).value;
    this.searchQuery = query;
    if (!query.trim()) {
      this.filteredGoals = this.goals ? [...this.goals] : [];
      return;
    }
    this.filteredGoals = this.goals!.filter(
      (goal) =>
        goal.title.toLowerCase().includes(query.toLowerCase()) ||
        goal.description.toLowerCase().includes(query.toLowerCase())
    );
    this.setFiltersApplied();
  }
  clearFilters(): void {
    this.filteredGoals = this.goals ? [...this.goals] : [];
    this.selectedCategory = '';
    this.searchQuery = '';
    this.setFiltersApplied();
  }
}
