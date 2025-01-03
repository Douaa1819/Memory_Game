import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
];
@NgModule({
  declarations: [
    WelcomeComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ]
})
export class WelcomePageModule { }
