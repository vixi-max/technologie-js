import { Component } from '@angular/core';
import { BookNamePipe } from '../book-name-pipe';

interface Book {
  name: string;
  year: number;
}

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [BookNamePipe],
  templateUrl: './books.html',
  styleUrls: ['./books.css'],
})
export class Books {
  books: Book[] = [
    { name: 'Angular Basics', year: 2019 },
    { name: 'Advanced Angular', year: 2021 },
    { name: 'Web Development', year: 2023 }
  ];
}
