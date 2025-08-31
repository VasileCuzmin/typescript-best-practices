import { Todo } from '../entities';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isTodo(todo: any): todo is Todo {
  return todo instanceof Todo;
}
