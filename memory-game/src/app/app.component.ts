import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}

  startGame() {
    console.log('The game has started!');
    this.router.navigate(['/start-game']);
  }
}
