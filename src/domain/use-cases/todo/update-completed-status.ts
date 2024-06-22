import { Observable, of } from 'rxjs';

import { Todo } from '../../entities';
import { UseCase } from '../use-case.interface';

export class UpdateCompletedStatusUseCase implements UseCase<void> {
  execute(todo: Todo, status: boolean): Observable<void> {
    return of(todo.updateCompleted(status));
  }
}
