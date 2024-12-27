import { Component, Input, SimpleChanges, NgZone, OnChanges } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Sequence } from '../../types/sequence';
import { Answer } from '../../types/answer';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  animations: [
    trigger('cardAnimation', [
      state('inactive', style({
        transform: 'scale(1)',
        opacity: '0.9'
      })),
      state('active', style({
        transform: 'scale(1.1)',
        opacity: '1',
        boxShadow: '0 0 20px rgba(255,255,255,0.8)'
      })),
      transition('inactive <=> active', animate('300ms ease-in-out'))
    ])
  ]

})
export class CardComponent implements OnChanges {
  @Input() sequence: Sequence[] = [];
  shuffledSequence: Sequence[] = [];
  cardStates: { [key: number]: string } = {}
  isPlaying: boolean = false;
  startTime: number = 0;
  playerSequence: Answer = { playerSequence: [], timeRemaining: 0 };


  constructor(private ngZone: NgZone) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sequence']) {
      this.resetGame();
      this.shuffleSequence();
    }
  }


  private resetGame(): void {
    this.playerSequence = { playerSequence: [], timeRemaining: 0 };
    this.isPlaying = false;
  }

  startDisplaySequence(): void {
    this.isPlaying = true;
    this.startTime = Date.now();

    this.displaySequenceWithDelay();
    // this.startCountdown();
  }

  private displaySequenceWithDelay(): void {
    const sortedSequence = [...this.sequence].sort((a, b) => a.order - b.order);
    const displayDuration = 800; // ms for each card display
    const pauseDuration = 200;  // ms between cards

    sortedSequence.forEach((card, index) => {
      setTimeout(() => {
        this.illuminateCard(card.order);
      }, index * (displayDuration + pauseDuration));
    });
  }

  private illuminateCard(order: number): void {
    this.cardStates[order] = 'active';
    setTimeout(() => {
      this.cardStates[order] = 'inactive';
    }, 700);
  }

  // private startCountdown(): void {
  //   this.ngZone.runOutsideAngular(() => {
  //     const timer = setInterval(() => {
  //       this.ngZone.run(() => {
  //         this.remainingTime--;
  //         if (this.remainingTime <= 0) {
  //           clearInterval(timer);
  //           this.isPlaying = false;
  //         }
  //       });
  //     }, 1000);
  //   });
  // }

  shuffleSequence(): void {
    this.shuffledSequence = [...this.sequence]
      .sort(() => Math.random() - 0.5);
    console.log(this.shuffledSequence);
  }


  onCardClick(card: Sequence): void {
    if (!this.isPlaying && this.playerSequence.playerSequence.length < this.sequence.length) {
      this.playerSequence.playerSequence.push(card);
      this.illuminateCard(card.order);
      console.log("caaaaaaaaaaard" +card.order);
    }
  }

  validateSequence(): Answer {
    const timeElapsed = (Date.now() - this.startTime) / 1000;
    this.playerSequence.timeRemaining = timeElapsed;
    return this.playerSequence;
  }

  resetSequence(): void {
    this.playerSequence = { playerSequence: [], timeRemaining: 0 };
  }

  sequencePlaying(): boolean {
    return this.isPlaying;
  }
  canChoose(value :boolean): void {
    this.isPlaying = value;
  }
}
