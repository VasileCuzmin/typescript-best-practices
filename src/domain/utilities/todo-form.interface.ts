// THIS INTERFACE DEFINES THE STRUCTURE OF A TODO FORM.
// It is used to represent the data required to create or update a Todo item.
// So no need to do type assertions or type guards when working with this form data.
export interface TodoForm {
  title: string;
  completed: boolean;
}
//Instead of this one we can use Partial<Todo> when we want to work with partial form data.
