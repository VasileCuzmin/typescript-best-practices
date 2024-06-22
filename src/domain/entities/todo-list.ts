import { Todo } from './todo';

export class TodoList {
  constructor(
    public title: string,
    public todos: Todo[]
  ) {}

  public addTodo(todo: Todo): boolean | string {
    let exists;

    for (let count = 0; count < this.todos.length; count++) {
      if (this.todos[count]?.title === todo.title) {
        exists = true;
        break;
      }
    }

    if (exists) {
      return 'Todo already exists!';
    } else {
      this.todos.push(todo);
      return true;
    }
  }

  public deleteTodo(todo: Todo) {
    this.todos = this.todos.filter(t => t.title !== todo.title);
  }

  public getAllTodos(): Todo[] {
    return this.todos;
  }
}
