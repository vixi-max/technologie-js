import { Component } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  standalone:true,
  templateUrl: './counter.html',
  styleUrl: './counter.css',
})
export class Counter {
number: number = 0;

  increment() {
    this.number++;
  }

  decrement() {
    if (this.number > 0) {
      this.number--;
    }
  }

  reset() {
    this.number = 0;
  }
   setCustomValue(value: number) {
    this.number = value;
  }
}
