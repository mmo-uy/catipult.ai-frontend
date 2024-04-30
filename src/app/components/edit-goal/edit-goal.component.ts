import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { GoalService } from '../../services/goal.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {
  extractAction,
  extractFrequency,
  goalDescriptionValidator,
  goalDescriptionValidator1,
} from '../../../utils/goalValidator';
import { CATEGORIES, GOAL_DESCRIPTION_PATTERN } from '../../../utils/constants';
import { dateFormat } from '../../../utils/dates';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-goal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './edit-goal.component.html',
  styleUrl: './edit-goal.component.scss',
})
export class AddEditGoalComponent implements OnInit {
  id: string = '';
  goalForm: FormGroup = new FormGroup({
    description: new FormControl(''),
    title: new FormControl(''),
    category: new FormControl(''),
    deadline: new FormControl(''),
    completed: new FormControl(false),
  });
  categoriesList: Array<string> = CATEGORIES;
  selectedCategory?: string;
  error: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private goalService: GoalService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.goalForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', goalDescriptionValidator()],
      category: ['', Validators.required],
      deadline: ['', Validators.required],
      completed: [false, Validators.required],
    });
    if (this.id !== '') {
      this.goalService.getSingle(this.id).subscribe({
        next: (data) => {
          const {
            title,
            action,
            completed,
            frequency,
            category,
            description,
            id,
            deadline,
          } = data;
          this.goalForm.patchValue({
            title,
            action,
            completed,
            frequency,
            category,
            description,
            id,
          });
          const addOne = new Date(deadline!);
          addOne.setDate(addOne.getDate() + 1);
          this.goalForm!.get('deadline')!.patchValue(dateFormat(addOne!));
        },
        error: (e) => {
          this.error = true;
          console.error(e);
          this.toastr.error('An error occurred', 'Ooops!', {});
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 3000);
        },
      });
      this.goalForm.get('category')?.valueChanges.subscribe((value) => {
        this.selectedCategory = value;
      });
      this.goalForm.get('deadline')?.valueChanges.subscribe((value) => {
        console.log(value);
      });
    } else {
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 3000);
    }
  }
  onEdit() {
    const { description, completed, title, deadline } = this.goalForm.value;
    const action = extractAction(description);
    const frequency = extractFrequency(description);
    this.goalService
      .update(this.id, {
        completed: completed!,
        description: description!,
        action: action!,
        frequency: frequency!,
        title: title!,
        category: this.selectedCategory,
        deadline: new Date(deadline),
      })
      .subscribe({
        next: (res) => {
          console.log(res);
          this.toastr.success('Updated successfully!', 'Success!');
          setTimeout(() => {
            this.goalForm.reset();
            this.router.navigate(['/']);
          }, 1000);
        },
        error: (e) => console.error(e),
      });
  }
}
