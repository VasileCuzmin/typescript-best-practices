import { Observable, of } from 'rxjs';

import { Todo } from '../../entities';
import { UseCase } from '../use-case.interface';

export class CreateTodoUseCase implements UseCase<Todo> {
  execute(todo: Partial<Todo>): Observable<Todo> {
    return of(new Todo(todo.title!, todo.completed!));
  }
}
