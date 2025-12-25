import { Routes } from '@angular/router';
import { NotFound } from './not-found/not-found';
import { PostDetails } from './post-details/post-details';
import { Posts } from './posts/posts';
import { Home } from './home/home';

export const routes: Routes = [
    { path: '', component: Home},
  { path: 'posts', component: Posts},
  { path: 'posts/:id', component: PostDetails},
  { path: '**', component: NotFound }
];
