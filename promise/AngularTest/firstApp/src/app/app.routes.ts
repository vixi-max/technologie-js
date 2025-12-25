import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: 'Counter',
    loadComponent: () => import('./counter/counter').then(m => m.Counter)
  },
  
];
