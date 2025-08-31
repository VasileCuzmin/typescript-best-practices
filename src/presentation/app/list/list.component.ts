import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NewTodoPopupComponent } from '../new-todo-popup/new-todo-popup.component';
import { TodoComponent } from '../todo/todo.component';
import { Todo, TodoList } from '../../../domain/entities';
import {
  CreateTodoUseCase,
  AddTodoUseCase,
  DeleteToDoUseCase,
} from '../../../domain/use-cases';

const createTodoUseCaseFactory = new CreateTodoUseCase();
const addTodoUseCaseFactory = new AddTodoUseCase();
const deleteTodoUseCaseFactory = new DeleteToDoUseCase();

@Component({
  selector: 'app-list',
  imports: [FormsModule, NewTodoPopupComponent, TodoComponent],
  providers: [
    { provide: CreateTodoUseCase, useValue: createTodoUseCaseFactory },
    { provide: AddTodoUseCase, useValue: addTodoUseCaseFactory },
    { provide: DeleteToDoUseCase, useValue: deleteTodoUseCaseFactory },
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private createTodo = inject(CreateTodoUseCase);
  private addTodoUseCase = inject(AddTodoUseCase);
  private deleteTodoUseCase = inject(DeleteToDoUseCase);

  @Input() public list: TodoList | undefined = undefined;

  @Output() deleteList = new EventEmitter<string>();
  @Output() saveList = new EventEmitter<void>();

  public showAddTodoForm = false;

  public showAddForm(): void {
    this.showAddTodoForm = true;
  }

  public closeAddForm(): void {
    this.showAddTodoForm = false;
  }

  public addTodo(event: Partial<Todo>): void {
    this.createTodo.execute(event).subscribe({
      next: (todo: Todo) => {
        this.addTodoUseCase.execute(this.list!, todo).subscribe();
        this.closeAddForm();
        this.saveList.emit();
      },
    });
  }

  public deleteTodoList(): void {
    this.deleteList.emit(this.list!.title);
  }

  public deleteTodo(todo: Todo): void {
    this.deleteTodoUseCase.execute(this.list!, todo).subscribe({
      next: () => this.saveList.emit(),
    });
  }
}
