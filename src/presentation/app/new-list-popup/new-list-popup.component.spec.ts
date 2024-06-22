import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewListPopupComponent } from './new-list-popup.component';

describe('NewListPopupComponent', () => {
  let component: NewListPopupComponent;
  let fixture: ComponentFixture<NewListPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewListPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewListPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
