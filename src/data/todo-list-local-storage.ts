import { TodoListRepository } from '../domain/repositories/todo-list';
import type { TodoList, Todo } from '../domain/entities';
import { StorageError } from '../domain/utilities/storage-error';

export class TodoListLocalStorage extends TodoListRepository {
  private parseListData(json: string): Promise<TodoList[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(JSON.parse(json));
      });
    });
  }

  private mapListsData(
    lists: TodoList[],
    TodoConstructor: typeof Todo,
    ListConstructor: typeof TodoList
  ): Promise<TodoList[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        const constructedLists = lists.map(list => {
          const todos = list.todos.map(
            todo => new TodoConstructor(todo.title, todo.completed)
          );

          return new ListConstructor(list.title, todos);
        });

        resolve(constructedLists);
      });
    });
  }

  public getTodoLists(
    TodoConstructor: typeof Todo,
    ListConstructor: typeof TodoList
  ): Promise<TodoList[]> {
    return new Promise(resolve => {
      const listsData = localStorage.getItem('todo-lists');
      if (listsData) {
        this.parseListData(listsData).then(lists => {
          resolve(this.mapListsData(lists, TodoConstructor, ListConstructor));
        });
      }
    });
  }

  public saveTodoLists(lists: TodoList[]): void {
    try {
      localStorage.setItem('todo-lists', JSON.stringify(lists));
    } catch (error: unknown) {
      if (error instanceof DOMException) {
        switch (error.name) {
          case 'SecurityError':
            throw new StorageError(
              error.name,
              'Access to LocalStorage is denied, todo lists could not be saved. Please enable LocalStorage to use this app',
              error
            );
          case 'QuotaExceededError':
            throw new StorageError(
              error.name,
              'LocalStorage is full up, todo lists could not be saved. Please delete old todo lists and try again',
              error
            );
        }
      }
    }
  }
}
