import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import{ReactiveFormsModule}from'@angular/forms';
import{CommonModule}from'@angular/common';
@Component({
  selector: 'app-register',
 standalone: true,
  imports: [ReactiveFormsModule,CommonModule, ], 
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  registerForm: any;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }


  submit() {
    console.log(this.registerForm.value);
  }
}
