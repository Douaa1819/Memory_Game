import { Answer } from './../../types/answer';
import { ResultService } from './../../service/result/result.service';
import { CardComponent } from './../cards/cards.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { GameService } from './../../service/game/game.service';
import { ScoreService } from './../../service/score/score.service';
import { ScoreComponent } from '../score/score.component';
import { Sequence } from '../../types/sequence';
import { Result } from '../../types/result';
import { trigger, state, style, animate, transition } from '@angular/animations';


@Component({
  selector: 'app-game-board',
  standalone: false,
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 })),
      ])
    ])
  ]
})
export class GameBoardComponent implements OnInit {
  @ViewChild(CardComponent) cardComponent!: CardComponent;
  @ViewChild(ScoreComponent) scoreComponent!: ScoreComponent;
  cardStates: { [key: number]: string } = {};
  playerSequence: { playerSequence: any[] } = { playerSequence: [] };
  sequence: Sequence[] = [];
  level: number = 1;
  gameMessage: string = '';
  isGameOver: boolean = false;
  currentScore: number = 0;
  remainingTime: number = 0;

  constructor(
    private gameService: GameService,
    private scoreService: ScoreService,
    private resultService: ResultService
  ) {}

  ngOnInit(): void {
    this.startNewGame();
    this.startTimer();
  }

  startNewGame(): void {
    this.isGameOver = false;
    this.level = 1;
    this.scoreService.resetScore();
   this.sequence= this.gameService.getSequence()
    this.gameService.gameOver();
    this.startNewLevel();
  }
  startTimer(): void {
    let timeLeft = 5;
    const timerInterval = setInterval(() => {
      if (timeLeft >= 0) {
        this.remainingTime = timeLeft;
        timeLeft--;
        this.cardComponent?.canChoose(true);
      } else {
        clearInterval(timerInterval);
        this.cardComponent.canChoose(false);
        const answer: Answer = {
          playerSequence: [],
          timeRemaining: 0,

        };
      }
    }, 1000);
  }


  startNewLevel(): void {
    this.startTimer();
     this.gameService.generateNewSequence();
    this.sequence =  this.gameService.getSequence();
    setTimeout(() => {
      this.cardComponent?.startDisplaySequence();
    }, 1000);
  }

  onCardClick(card: any): void {

    if (this.isPlaying()) {
      return;
    }

    this.playerSequence.playerSequence.push(card);
    this.cardStates[card.order] = 'active';
  }
  validateSequence(): void {
    if (this.cardComponent.sequencePlaying()) return;

    let answer: Answer =  this.cardComponent.validateSequence();

    console.log("answer", answer);
    if (answer.playerSequence.length === 0) {
      this.handleGameOver(answer);
      return;
    }

    if (this.gameService.checkAnswer(answer)) {
      this.handleCorrectAnswer(answer);
    } else {
      this.handleGameOver(answer);
    }
  }


  resetGame(): void {
    this.startNewGame();
  }

  private handleCorrectAnswer(answer: Answer): void {
    this.level++;
    const points = this.scoreService.calculateScore(answer.timeRemaining);
    this.currentScore += points;
    // this.updateGameMessage(this.getSuccessMessage());
    this.startNewLevel();
  }

  private handleGameOver(answer: Answer): void {
    this.isGameOver = true;
    this.updateGameMessage('Game Over! 🎮 Final Score: ' + this.currentScore);

    const result: Result = {
      id: 0,
      score: this.currentScore,
      level: this.level,
      sequenceChosen: answer.playerSequence,
      sequenceCorrect: this.sequence
    };
    this.resultService.setResult(result);
  }

  private updateGameMessage(message: string): void {
    this.gameMessage = message;
  }

  private getSuccessMessage(): string {
    if (this.level <= 5) {
      return `Level ${this.level} - Nice start! Keep going! 🌟`;
    } else if (this.level <= 10) {
      return `Level ${this.level} - You're getting good at this! 🚀`;
    } else if (this.level <= 15) {
      return `Level ${this.level} - Amazing memory! 🏆`;
    } else {
      return `Level ${this.level} - You're a memory master! 👑`;
    }
  }



  isPlaying(): boolean {
    return this.cardComponent?.sequencePlaying() || false;
  }



isGameOverMethod(): boolean {
  return this.isGameOver;
}
}
