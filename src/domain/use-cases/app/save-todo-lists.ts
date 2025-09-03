import { Observable, of, throwError } from 'rxjs';

import { TodoList } from '../../entities';
import { UseCase } from '../use-case.interface';
import { TodoListRepository } from '../../repositories/todo-list';

export class SaveTodoListsUseCase implements UseCase<void> {
  constructor(private todoListRepository: TodoListRepository) {}

  execute(lists: TodoList[]): Observable<void> {
    try {
      return of(this.todoListRepository.saveTodoLists(lists));
    } catch (err: unknown) {
      return throwError(() => err);
    }
  }
}
