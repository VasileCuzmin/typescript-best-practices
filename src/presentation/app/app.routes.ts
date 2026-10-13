import { Routes } from '@angular/router';

// Application routes configuration
export const routes: Routes = [
  {
    path: 'new-list',
    // Lazy load the NewListPopupComponent when the 'new-list' route is accessed
    loadComponent: () =>
      import('./new-list-popup/new-list-popup.component').then(
        m => m.NewListPopupComponent
      ),
  },
];
