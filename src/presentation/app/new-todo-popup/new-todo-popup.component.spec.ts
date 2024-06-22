import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTodoPopupComponent } from './new-todo-popup.component';

describe('NewTodoPopupComponent', () => {
  let component: NewTodoPopupComponent;
  let fixture: ComponentFixture<NewTodoPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTodoPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewTodoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
