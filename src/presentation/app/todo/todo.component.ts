import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Todo } from '../../../domain/entities';
import { UpdateCompletedStatusUseCase } from '../../../domain/use-cases';

const updateCompleteUseCaseFactory = new UpdateCompletedStatusUseCase();

@Component({
  selector: 'app-todo',
  imports: [FormsModule],
  providers: [
    {
      provide: UpdateCompletedStatusUseCase,
      useValue: updateCompleteUseCaseFactory,
    },
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  private updateCompletedStatusUseCase = inject(UpdateCompletedStatusUseCase);

  @Input() todo: Todo | undefined = undefined;

  @Output() delete = new EventEmitter<Todo>();
  @Output() saveTodo = new EventEmitter<void>();

  public completeStatusChanged(): void {
    this.updateCompletedStatusUseCase
      .execute(this.todo!, this.todo!.completed)
      .subscribe({
        next: () => this.saveTodo.emit(),
      });
  }

  public deleteTodo(): void {
    this.delete.emit(this.todo);
  }
}
