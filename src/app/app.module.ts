import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { GameViewComponent } from './game-view/game-view.component';
import { MapComponent } from './map/map.component';
import { TribeButtonComponent } from './tribe-button/tribe-button.component';
import { MenuButtonComponent } from './menu-button/menu-button.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ManualComponent } from './manual/manual.component';
import { CounterComponent } from './counter/counter.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    GameViewComponent,
    MapComponent,
    TribeButtonComponent,
    MenuButtonComponent,
    NotFoundComponent,
    ManualComponent,
    CounterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
