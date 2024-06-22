import { Observable, of } from 'rxjs';

import { Todo, TodoList } from '../../entities';
import { UseCase } from '../use-case.interface';

export class AddTodoUseCase implements UseCase<string | boolean> {
  execute(list: TodoList, todo: Todo): Observable<string | boolean> {
    return of(list.addTodo(todo));
  }
}
