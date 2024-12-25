import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameBoardComponent } from './components/game-board/game-board.component';
import { ColorButtonsComponent } from './components/color-buttons/color-buttons.component';
import { ScoreDisplayComponent } from './components/score-display/score-display.component';
import { StartGameComponent } from './components/start-game/start-game.component';



@NgModule({
  declarations: [
    GameBoardComponent,
    ColorButtonsComponent,
    ScoreDisplayComponent,
    StartGameComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GameModule { }
