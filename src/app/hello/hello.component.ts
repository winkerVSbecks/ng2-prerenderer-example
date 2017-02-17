import { Component } from '@angular/core';

@Component({
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css'],
})
export class HelloComponent {
  count: number = 12;

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }
}
