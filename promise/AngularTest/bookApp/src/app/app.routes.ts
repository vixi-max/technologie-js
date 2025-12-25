import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full'
  },
  {
    path: 'books',
    loadComponent: () => import('./book-list/book-list').then(m => m.BookList)
  },
  {
    path: 'books/create',
    loadComponent: () => import('./book-create/book-create').then(m => m.BookCreate)
  },
  
  {
    path: '**',
    redirectTo: 'books'
  }
];
