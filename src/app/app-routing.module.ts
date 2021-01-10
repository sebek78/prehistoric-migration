import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameViewComponent } from './game-view/game-view.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ManualComponent } from './manual/manual.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'game', component: GameViewComponent },
  { path: 'manual', component: ManualComponent},
  { path: '', component: HomepageComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
