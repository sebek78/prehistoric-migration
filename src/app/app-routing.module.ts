import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameViewComponent } from './game-view/game-view.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'game', component: GameViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
