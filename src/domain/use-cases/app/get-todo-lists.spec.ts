import { GetTodoListsUseCase } from './get-todo-lists';
import { TodoListRepository } from '../../repositories/todo-list';
import { TodoList } from '../../entities';
import { Observable } from 'rxjs';

describe('GetTodoListsUseCase', () => {
  let getTodoListsUseCase: GetTodoListsUseCase;
  let fakeRepo: TodoListRepository;

  // Arrange
  beforeEach(() => {
    const fakeTodoList = [] as unknown as TodoList[];
    fakeRepo = {
      getTodoLists: jest.fn().mockReturnValue(fakeTodoList),
    } as unknown as TodoListRepository;

    getTodoListsUseCase = new GetTodoListsUseCase(fakeRepo);
  });

  describe('execute()', () => {
    it('returns an observable containing an array of the todo lists', () => {
      // Act
      const result = getTodoListsUseCase.execute();

      // Assert
      expect(result instanceof Observable).toEqual(true);
    });

    it('calls the getTodoLists method of the repository', () => {
      // Act
      getTodoListsUseCase.execute();

      // Assert
      expect(fakeRepo.getTodoLists).toHaveBeenCalled();
    });
  });
});
