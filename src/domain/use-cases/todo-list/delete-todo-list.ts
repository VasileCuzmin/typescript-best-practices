import { Observable, of } from 'rxjs';

import { TodoList } from '../../entities';
import { UseCase } from '../use-case.interface';

export class DeleteTodoListUseCase implements UseCase<TodoList[]> {
  execute(title: string, lists: TodoList[]): Observable<TodoList[]> {
    return of(lists.filter(list => list.title !== title));
  }
}
