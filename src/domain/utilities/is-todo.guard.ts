import { Todo } from '../entities';

//THIS IS A TYPE GUARD FUNCTION FOR THE TODO CLASS.

// Type guard to check if an object is an instance of the Todo class.
// Why the return type is `todo is Todo`:
// This is a TypeScript type predicate, which allows the compiler to understand
// that if this function returns true, the variable `todo` can be treated as a `Todo` instance.
//Why not a boolean?
// Using a boolean would not provide the compiler with information about the type of `todo`.
// The type predicate `todo is Todo` allows TypeScript to narrow the type within conditional blocks.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isTodo(todo: any): todo is Todo {
  return todo instanceof Todo;
}

// TYPE GUARD VS TYPE ASSERTION
// A type guard (like `isTodo`) checks the type at runtime and informs the TypeScript compiler about the type.
// A type assertion (like `todo as Todo`) tells the compiler to treat a variable as a specific type without any runtime check.
// Type guards are safer because they perform actual checks, whereas type assertions can lead to runtime errors if used incorrectly.
