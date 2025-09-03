import { Component, OnInit, inject } from '@angular/core';
import { NewListPopupComponent } from './new-list-popup/new-list-popup.component';
import { ListComponent } from './list/list.component';
import {
  CreateTodoListUseCase,
  SaveTodoListsUseCase,
  DeleteTodoListUseCase,
  GetTodoListsUseCase,
} from '../../domain/use-cases';
import { TodoListRepository } from '../../domain/repositories/todo-list';
import { GetDataStore } from '../../domain/utilities/get-data-store';
import { TodoList } from '../../domain/entities';
import { Themes } from './themes.enum';
import { logIt } from '../../domain/utilities/logger';
import { instrument } from '../../domain/utilities/instrument.decorator';
import { StorageError } from '../../domain/utilities/storage-error';

const createTodoListUseCaseFactory = () => new CreateTodoListUseCase();
const deleteTodoListUseCaseFactory = () => new DeleteTodoListUseCase();
const saveTodoListsFactory = (listRepository: TodoListRepository) =>
  new SaveTodoListsUseCase(listRepository);
const getTodoListsFactory = (listRepository: TodoListRepository) =>
  new GetTodoListsUseCase(listRepository);

@instrument
@Component({
  selector: 'app-root',
  imports: [NewListPopupComponent, ListComponent],
  providers: [
    {
      provide: CreateTodoListUseCase,
      useFactory: createTodoListUseCaseFactory,
    },
    {
      provide: DeleteTodoListUseCase,
      useFactory: deleteTodoListUseCaseFactory,
    },
    {
      provide: SaveTodoListsUseCase,
      useFactory: saveTodoListsFactory,
      deps: [TodoListRepository],
    },
    {
      provide: GetTodoListsUseCase,
      useFactory: getTodoListsFactory,
      deps: [TodoListRepository],
    },
    { provide: TodoListRepository, useFactory: GetDataStore },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private createTodoListUseCase = inject(CreateTodoListUseCase);
  private saveTodoListsUseCase = inject(SaveTodoListsUseCase);
  private getTodoListsUseCase = inject(GetTodoListsUseCase);
  private deleteTodoListUseCase = inject(DeleteTodoListUseCase);

  public showNewListForm = false;
  public lists: TodoList[] = [];

  public ngOnInit(): void {
    this.getAllTodoLists();
  }

  public showAddForm(): void {
    this.showNewListForm = true;
  }

  public closeAddForm(): void {
    this.showNewListForm = false;
  }

  public createNewList(listName: string): void {
    this.createTodoListUseCase.execute(listName, []).subscribe({
      next: list => {
        this.lists.push(list);
        this.closeAddForm();
        logIt('INFO', { message: 'New list created!' });
      },
    });
  }

  public getAllTodoLists(): void {
    this.getTodoListsUseCase.execute().subscribe({
      next: (lists: TodoList[]) => {
        if (lists) {
          this.lists = lists;
        }
      },
    });
  }

  public saveLists(): void {
    this.saveTodoListsUseCase.execute(this.lists).subscribe({
      error: (err: StorageError) => {
        console.log('Subscriber error:', err.name);
      },
    });
  }

  public deleteTodoList(listTitle: string): void {
    this.deleteTodoListUseCase.execute(listTitle, this.lists).subscribe({
      next: lists => {
        this.lists = lists;
        this.saveLists();
      },
    });
  }

  public switchTheme(theme: Themes): void {
    const unhandled = (_: never): never => _;
    switch (theme) {
      case Themes.regular:
        // handle regular theme
        break;
      case Themes.dark:
        // handle dark theme
        break;
      case Themes.highContrast:
        // handle high contrast
        break;
      default:
        return unhandled(theme);
    }
  }
}
