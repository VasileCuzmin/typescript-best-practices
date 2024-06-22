import { Observable, of } from 'rxjs';

import { TodoList } from '../../entities';
import { UseCase } from '../use-case.interface';
import { TodoListRepository } from '../../repositories/todo-list';

export class SaveTodoListsUseCase implements UseCase<null | string> {
  constructor(private todoListRepository: TodoListRepository) {}

  execute(lists: TodoList[]): Observable<null | string> {
    return of(this.todoListRepository.saveTodoLists(lists));
  }
}
