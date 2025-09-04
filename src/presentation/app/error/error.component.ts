import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss',
})
export class ErrorComponent {
  @Input() public name = '';
  @Input() public message = '';

  @Output() public closePopup = new EventEmitter<void>();

  public close() {
    this.closePopup.emit();
  }
}
