import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'new-list',
    loadComponent: () =>
      import('./new-list-popup/new-list-popup.component').then(
        m => m.NewListPopupComponent
      ),
  },
];
