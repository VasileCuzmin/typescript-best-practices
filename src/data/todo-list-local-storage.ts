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

  public saveTodoLists(lists: TodoList[]): null | string {
    let err;
    try {
      localStorage.setItem('todo-lists', JSON.stringify(lists));
      return null;
    } catch {
      err = 'An error occured';
    }

    return err;
  }
}
