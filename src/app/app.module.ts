import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { HomepageModule } from './homepage/homepage.module';
import { GameViewModule } from './game-view/game-view.module';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HomepageModule,
    GameViewModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
