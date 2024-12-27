import { Component, OnInit } from '@angular/core';
import { ResultService } from '../../service/result/result.service';
import { Router } from '@angular/router';
import { Result } from '../../types/result';

@Component({
  selector: 'app-result',
  standalone: false,
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  currentResult!: Result;

  constructor(
    private resultService: ResultService,
    private router: Router
  ) {}

  ngOnInit() {
    console.log('Navigating to ResultComponent');
    this.currentResult = this.resultService.getCurrentResult();
    console.log('Current Result:', this.currentResult);
    if (!this.currentResult) {
      this.router.navigate(['/']);
    }
  }

  playAgain() {
    this.router.navigate(['/game']);
  }

  exitGame() {
    localStorage.removeItem('playerName');
    this.resultService.clearResults();
    this.router.navigate(['/']);
  }
}
