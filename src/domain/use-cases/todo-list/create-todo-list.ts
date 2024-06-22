import { Observable, of } from 'rxjs';

import { Todo, TodoList } from '../../entities';
import { UseCase } from '../use-case.interface';

export class CreateTodoListUseCase implements UseCase<TodoList> {
  execute(title: string, todos: Todo[]): Observable<TodoList> {
    return of(new TodoList(title, todos));
  }
}
