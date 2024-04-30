import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { goalDescriptionValidator } from '../../../utils/goalValidator';
import { CommonModule } from '@angular/common';
import { CATEGORIES } from '../../../utils/constants';
import { dateFormat } from '../../../utils/dates';

@Component({
  selector: 'app-add-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './add-modal.component.html',
  styleUrl: './add-modal.component.scss',
})
export class AddModalComponent {
  @ViewChild('addModal') addModal!: ElementRef;
  @Output() saveEvent = new EventEmitter<boolean>();
  goalForm: FormGroup;
  categoriesList: Array<string> = CATEGORIES;
  selectedCategory?: string;
  submitted = false;
  constructor(private formBuilder: FormBuilder) {
    this.goalForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', goalDescriptionValidator()],
      category: ['', Validators.required],
      deadline: ['', Validators.required],
      completed: [false, Validators.required],
    });
    this.goalForm!.get('deadline')!.patchValue(dateFormat(new Date()));
    this.goalForm.get('category')?.valueChanges.subscribe((value) => {
      this.selectedCategory = value;
    });
  }

  onSave() {
    this.saveEvent.emit(true);
    this.submitted = true;
  }
  openModal(): void {
    this.addModal.nativeElement.style.display = 'block';
    this.addModal.nativeElement.style.opacity = '1';
    this.addModal.nativeElement.style.background = '#008b8bcf';
  }

  closeModal(): void {
    this.addModal.nativeElement.style.display = 'none';
    this.addModal.nativeElement.style.opacity = '0';
    this.goalForm.reset();
  }
}
