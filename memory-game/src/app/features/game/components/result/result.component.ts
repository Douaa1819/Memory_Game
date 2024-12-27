import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ResultService } from '../../service/result/result.service';
import { Router } from '@angular/router';
import { Result } from '../../types/result';


@Component({
  selector: 'app-result',
  standalone: false,

  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  currentResult!: Result;

  constructor(
    private resultService: ResultService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentResult = this.resultService.getCurrentResult();
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


