import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { Goal } from '../../../../types';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GoalService } from '../../services/goal.service';
import { dateFormat } from '../../../utils/dates';

@Component({
  selector: 'app-single-goal',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './single-goal.component.html',
  styleUrl: './single-goal.component.scss',
})
export class SingleGoalComponent implements OnInit {
  @Output() goalDeleted: EventEmitter<string> = new EventEmitter<string>();
  @Input() goal!: Goal;
  formattedDate: string = '';
  isSelected: boolean = false;

  private clickListener?: () => void;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private goalService: GoalService
  ) {}

  ngOnInit(): void {
    this.clickListener = this.renderer.listen(
      'document',
      'click',
      (event: MouseEvent) => {
        if (!this.elementRef.nativeElement.contains(event.target)) {
          this.isSelected = false;
        }
      }
    );
    if (this.goal.deadline) {
      const addOne = new Date(this.goal.deadline);
      addOne.setDate(addOne.getDate() + 1);
      this.formattedDate = dateFormat(addOne);
    }
  }

  ngOnDestroy(): void {
    if (this.clickListener) {
      this.clickListener();
    }
  }

  toggleSelected(): void {
    this.isSelected = !this.isSelected;
  }

  onDeleteButtonClick(event: Event, currentGoal: Goal): void {
    event.stopPropagation();
    this.goalDeleted.emit(currentGoal!.id!.toString());
  }
}
