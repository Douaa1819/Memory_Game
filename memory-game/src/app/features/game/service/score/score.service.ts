import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private scoreSubject = new BehaviorSubject<number>(0);
  score$ = this.scoreSubject.asObservable();

  calculateScore(timeRemaining: number): number {
    const basePoints = 100;
    const timeBonus = Math.max(0, 15 - timeRemaining) * 10;
    const points = basePoints - timeBonus;
    const roundedPoints = Math.round(points * 100) / 100;

    this.scoreSubject.next(this.scoreSubject.value + roundedPoints);
    return roundedPoints;
  }

  getCurrentScore(): number {
    return this.scoreSubject.value;
  }

  resetScore(): void {
    this.scoreSubject.next(0);
  }
}
