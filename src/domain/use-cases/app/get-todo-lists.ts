import { Observable, of } from 'rxjs';

import { TodoList, Todo } from '../../entities';
import { UseCase } from '../use-case.interface';
import { TodoListRepository } from '../../repositories/todo-list';

export class GetTodoListsUseCase implements UseCase<TodoList[]> {
  constructor(private todoListRepository: TodoListRepository) {}

  execute(): Observable<TodoList[]> {
    return of(this.todoListRepository.getTodoLists(Todo, TodoList));
  }
}
