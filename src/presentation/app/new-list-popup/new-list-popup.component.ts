import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-list-popup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-list-popup.component.html',
  styleUrl: './new-list-popup.component.scss',
})
export class NewListPopupComponent {
  @Output() createList = new EventEmitter<string>();
  @Output() closeModal = new EventEmitter<void>();

  protected listName = '';

  public createNewList(event: Event): void {
    event.preventDefault();
    this.createList.emit(this.listName);
  }

  public cancel(): void {
    this.closeModal.emit();
  }
}
