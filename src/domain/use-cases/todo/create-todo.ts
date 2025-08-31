import { Observable, of } from 'rxjs';

import { Todo } from '../../entities';
import { UseCase } from '../use-case.interface';
import { TodoForm } from '../../utilities/todo-form.interface';

export class CreateTodoUseCase implements UseCase<Todo> {
  execute(todo: TodoForm): Observable<Todo> {
    return of(new Todo(todo.title, todo.completed));
  }
}
