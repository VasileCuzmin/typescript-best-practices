import { TodoListRepository } from '../domain/repositories/todo-list';
import type { TodoList, Todo } from '../domain/entities';

export class TodoListLocalStorage extends TodoListRepository {
  public getTodoLists(
    TodoConstructor: typeof Todo,
    ListConstructor: typeof TodoList
  ): TodoList[] {
    const listsData = localStorage.getItem('todo-lists');
    let lists: TodoList[] = [];
    if (listsData) {
      lists = JSON.parse(listsData);
      lists = lists.map(list => {
        const todos = list.todos.map(
          todo => new TodoConstructor(todo.title, todo.completed)
        );
        return new ListConstructor(list.title, todos);
      });
    }

    return lists;
  }

  public saveTodoLists(lists: TodoList[]): null | never {
    const err = new Error();
    try {
      localStorage.setItem('todo-lists', JSON.stringify(lists));
      return null;
    } catch (error: unknown) {
      if (error instanceof DOMException) {
        switch (error.name) {
          case 'SecurityError':
            err.message =
              'Access to LocalStorage is denied, todo lists could not be saved. Please enable LocalStorage to use this app';
            err.cause = error;
            break;
          case 'QuotaExceededError':
            err.message =
              'LocalStorage is full up, todo lists could not be saved. Please delete old todo lists and try again';
            err.cause = error;
            break;
        }
      }
    }

    throw err;
  }
}
