import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './features/welcome-page/welcome/welcome.component';
import { GameBoardComponent } from './features/game/components/game-board/game-board.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'game', component: GameBoardComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
