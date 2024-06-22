import { Todo, TodoList } from '../entities';

export abstract class TodoListRepository {
  abstract getTodoLists(todo: typeof Todo, list: typeof TodoList): TodoList[];
  abstract saveTodoLists(lists: TodoList[]): null | string;
}
