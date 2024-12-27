import { Injectable } from '@angular/core';
import { Result } from '../../types/result';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  private currentResult: Result | null = null;
  private results: Result[] = [];

  setResult(result: Result) {
    result.id = this.results.length + 1;
    this.currentResult = result;
    this.results.push(result);
  }

  getCurrentResult(): Result {
    return this.currentResult!;
  }

  getAllResults(): Result[] {
    return [...this.results];
  }

  addResult(result: Result) {
    console.log('Adding result:', result);
    this.results.push(result);
  }

  clearResults() {
    this.results = [];
    this.currentResult = null;
  }
}
