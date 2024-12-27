import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardComponent } from './components/cards/cards.component';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { ScoreComponent } from './components/score/score.component';
import { ResultComponent } from './components/result/result.component';




@NgModule({
  declarations: [
    GameBoardComponent,
    ScoreComponent,
    ResultComponent,
    CardComponent,
  ],
  exports: [CardComponent,
    GameBoardComponent,
    ScoreComponent,


  ],
  imports: [
    CommonModule
  ]
})
export class GameModule { }
