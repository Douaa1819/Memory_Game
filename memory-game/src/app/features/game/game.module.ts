import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { ScoreComponent } from './components/score/score.component';
import { ResultComponent } from './components/result/result.component';
import { CardsComponent } from './components/cards/cards.component';
import { GameComponent } from './service/game/game.component';



@NgModule({
  declarations: [
    GameBoardComponent,
    ScoreComponent,
    ResultComponent,
    CardsComponent,
    GameComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GameModule { }
