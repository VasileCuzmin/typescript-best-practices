export class Todo {
  constructor(
    public title: string,
    public completed: boolean,
    public readonly id?: string // Optional unique identifier for the todo item.
    // It is read-only and automatically generated if not provided.
  ) {
    if (!id) this.id = crypto.randomUUID();
  }

  public updateCompleted(status: boolean) {
    this.completed = status;
    // this.id = crypto.randomUUID(); // cannot change after creation. It can be only initialized once in the constructor.
  }
}
