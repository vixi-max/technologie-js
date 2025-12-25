import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BookService } from '../services/book';

@Component({
  selector: 'app-book-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './book-create.html',
  styleUrls: ['./book-create.scss']
})
export class BookCreate implements OnInit {
   bookForm: FormGroup;
  isLoading: boolean = false;
  isSubmitted: boolean = false;
  currentYear: number = new Date().getFullYear();

  commonGenres: string[] = [
    'Fiction', 'Non-fiction', 'Mystery', 'Science Fiction', 'Fantasy',
    'Romance', 'Thriller', 'Biography', 'History', 'Science',
    'Self-help', 'Poetry', 'Drama', 'Classic', 'Young Adult'
  ];

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private router: Router
  ) {
    this.bookForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(200)
      ]],
      author: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]],
      genre: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]],
      publishedYear: ['', [
        Validators.required,
        Validators.min(1000),
        Validators.max(this.currentYear),
        Validators.pattern('^[0-9]{4}$')
      ]]
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      const titleInput = document.getElementById('title');
      if (titleInput) titleInput.focus();
    }, 100);
  }

  get f() {
    return this.bookForm.controls;
  }

  getFieldErrors(fieldName: string): string[] {
    const control = this.bookForm.get(fieldName);
    const errors: string[] = [];
    
    if (control && control.errors && control.touched) {
      if (control.errors['required']) {
        errors.push('This field is required');
      }
      if (control.errors['minlength']) {
        errors.push(`Minimum ${control.errors['minlength'].requiredLength} characters required`);
      }
      if (control.errors['maxlength']) {
        errors.push(`Maximum ${control.errors['maxlength'].requiredLength} characters allowed`);
      }
      if (control.errors['min']) {
        errors.push(`Minimum value is ${control.errors['min'].min}`);
      }
      if (control.errors['max']) {
        errors.push(`Maximum value is ${control.errors['max'].max}`);
      }
      if (control.errors['pattern']) {
        errors.push('Please enter a valid 4-digit year');
      }
    }
    
    return errors;
  }

  selectGenre(genre: string): void {
    this.bookForm.patchValue({ genre });
  }

  onSubmit(): void {
    this.isSubmitted = true;
    
    if (this.bookForm.invalid) {
      Object.keys(this.bookForm.controls).forEach(key => {
        this.bookForm.get(key)?.markAsTouched();
      });
      return;
    }

    this.isLoading = true;
    
    this.bookService.createBook(this.bookForm.value).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        alert('Book created successfully!');
        this.router.navigate(['/books']);
      },
      error: (error: any) => {
        console.error('Error creating book:', error);
        this.isLoading = false;
        alert(`Failed to create book: ${error.message || 'Unknown error'}`);
      }
    });
  }

  onReset(): void {
    if (confirm('Are you sure you want to clear the form?')) {
      this.bookForm.reset();
      this.isSubmitted = false;
    }
  }

  onCancel(): void {
    if (this.bookForm.dirty && !this.isSubmitted) {
      if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
        this.router.navigate(['/books']);
      }
    } else {
      this.router.navigate(['/books']);
    }
  }
}
