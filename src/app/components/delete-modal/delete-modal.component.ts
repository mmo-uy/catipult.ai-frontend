import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent {
  @ViewChild('deleteModal') deleteModal!: ElementRef;
  @Output() confirmEvent = new EventEmitter<boolean>();
  @Output() cancelEvent = new EventEmitter<void>();

  openModal(): void {
    this.deleteModal.nativeElement.style.display = 'block';
    this.deleteModal.nativeElement.style.opacity = '1';
    this.deleteModal.nativeElement.style.background = '#dc3545d6';
  }

  closeModal(): void {
    this.deleteModal.nativeElement.style.display = 'none';
    this.deleteModal.nativeElement.style.opacity = '0';
  }

  onCancel(): void {
    this.closeModal();
    this.cancelEvent.emit();
  }

  onConfirm(): void {
    this.closeModal();
    this.confirmEvent.emit(true);
  }
}
