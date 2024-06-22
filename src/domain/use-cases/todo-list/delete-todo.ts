import { Observable, of } from 'rxjs';

import { Todo, TodoList } from '../../entities';
import { UseCase } from '../use-case.interface';

export class DeleteToDoUseCase implements UseCase<void> {
  execute(list: TodoList, todo: Todo): Observable<void> {
    return of(list.deleteTodo(todo));
  }
}
