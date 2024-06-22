export class Todo {
  constructor(
    public title: string,
    public completed: boolean,
  ) {}

  public updateCompleted(status: boolean) {
    this.completed = status;
  }
}
