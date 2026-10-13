import { TodoListRepository } from '../domain/repositories/todo-list';
import type { TodoList, Todo } from '../domain/entities';
import { StorageError } from '../domain/utilities/storage-error';

export class TodoListLocalStorage extends TodoListRepository {
  private parseListData(json: string): Promise<TodoList[]> {
    return new Promise(resolve => {
      // Simulate asynchronous parsing of JSON data
      // Introduce a small delay to mimic async behavior
      // Use setTimeout to simulate async parsing
      // Delay execution by 0 milliseconds to simulate async behavior
      //What happens behind?
      // The setTimeout function queues the parsing operation to be executed after the current call stack is cleared.
      // This allows the parsing to be asynchronous, simulating a delay similar to fetching data from a remote source.
      // The actual parsing of the JSON string happens inside the setTimeout callback.
      // This ensures that the parsing is done asynchronously, even though JSON.parse is synchronous.
      //IS THIS RELATED TO THE eVENT lOOP?
      // Yes, the setTimeout callback is executed as a macrotask in the event loop, after the current call stack is cleared.
      // The macrotask is picked up by the event loop and executed after the current synchronous code completes.
      // In summary, using setTimeout with a delay of 0 allows us to simulate asynchronous behavior and ensures that the JSON parsing happens asynchronously within the event loop.

      //What would happend if we didn't use setTimeout and just resolved immediately?
      // In that case, the parsing would be synchronous, and the promise would resolve immediately.
      // This could block the main thread if the JSON data is large, and it wouldn't simulate asynchronous behavior.
      //But marcotasks are not executed by main thread?
      // Actually, macrotasks are executed by the main thread, but they are queued to run after the current call stack is cleared.
      // This means that while the main thread is free to handle other synchronous code, it will eventually execute the macrotask when it reaches it in the event loop.
      //Still if json data is large, the main thread will eventually have to process it, which could cause a noticeable delay in the UI.
      // In practice, for large JSON data, it might be better to use Web Workers or other techniques to offload heavy processing from the main thread.
      // Using setTimeout with a delay of 0 is a common technique to defer execution and simulate async behavior without blocking the main thread.
      //So there is not a way to completely avoid blocking the main thread for large JSON data, but using setTimeout helps to defer execution and simulate async behavior.

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
      // Simulate asynchronous mapping of lists data using setTimeout
      // Introduce a small delay to mimic async behavior similar to parsing JSON data
      // Use setTimeout to simulate async mapping
      // Delay execution by 0 milliseconds to simulate async behavior
      //What happens behind?
      // The setTimeout function queues the mapping operation to be executed after the current call stack is cleared.
      // This allows the mapping to be asynchronous, simulating a delay similar to fetching data from a remote source.
      // The actual mapping of the lists data happens inside the setTimeout callback.
      // This ensures that the mapping is done asynchronously, even though the mapping itself is synchronous.
      //IS THIS RELATED TO THE eVENT lOOP?
      // Yes, the setTimeout callback is executed as a macrotask in the event loop, after the current call stack is cleared.
      // The macrotask is picked up by the event loop and executed after the current synchronous code completes.
      // In summary, using setTimeout with a delay of 0 allows us to simulate asynchronous behavior and ensures that the mapping happens asynchronously within the event loop.
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
