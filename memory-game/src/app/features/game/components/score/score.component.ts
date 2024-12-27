import { Component } from '@angular/core';
import { ScoreService } from '../../service/score/score.service';

@Component({
  selector: 'app-score',
  standalone: false,

  templateUrl: './score.component.html',
  styleUrl: './score.component.css'
})
export class ScoreComponent {
  currentScore: number = 0;
  highScore: number = 0;

  constructor(private scoreService: ScoreService) {
    this.scoreService.score$.subscribe(score => {
      this.currentScore = score;
      this.updateHighScore(score);
    });
  }

  private updateHighScore(score: number) {
    const savedHighScore = localStorage.getItem('highScore');
    const currentHighScore = savedHighScore ? parseInt(savedHighScore) : 0;
    if (score > currentHighScore) {
      this.highScore = score;
      localStorage.setItem('highScore', score.toString());
    }
  }

  getScore(): number {
    return this.currentScore;
  }
}
