export class Todo {
  constructor(
    public title: string,
    public completed: boolean,
    public readonly id?: string
  ) {
    if (id) this.id = crypto.randomUUID();
  }

  public updateCompleted(status: boolean) {
    this.completed = status;
  }
}
