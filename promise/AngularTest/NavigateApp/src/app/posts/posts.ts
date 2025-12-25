import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-posts',
  imports: [RouterLink],
    standalone: true,
  templateUrl: './posts.html',
  styleUrl: './posts.css',
})
export class Posts {
 posts = [
    { id: 1, title: 'Post One' },
    { id: 2, title: 'Post Two' },
    { id: 3, title: 'Post Three' }
  ];
}
