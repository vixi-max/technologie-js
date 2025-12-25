import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Book } from '../book';
import { BookService } from '../services/book';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-list.html',
 styleUrls: ['./book-list.scss']
})
export class BookList implements OnInit {
  books: Book[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.bookService.getBooks().subscribe({
      next: (books: Book[]) => {
        this.books = books;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading books:', error);
        this.errorMessage = 'Failed to load books. Please try again.';
        this.isLoading = false;
      }
    });
  }

  deleteBook(id: number): void {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe({
        next: () => {
          this.loadBooks();
        },
        error: (error: any) => {
          console.error('Error deleting book:', error);
          alert('Failed to delete book. Please try again.');
        }
      });
    }
  }

  trackByBookId(index: number, book: Book): number {
    return book.id!;
  }
}