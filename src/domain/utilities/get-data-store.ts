import { TodoListLocalStorage } from '../../data/todo-list-local-storage';

export function GetDataStore() {
  return new TodoListLocalStorage();
}
