import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameViewRoutingModule } from './game-view-routing.module';
import { SharedModule } from '../shared/shared.module';

import { MapComponent } from './map/map.component';
import { CounterComponent } from './counter/counter.component';
import { GameViewComponent } from './game-view.component';
import { ProgressListComponent } from './progress-list/progress-list.component';
import { LogsComponent } from './logs/logs.component';
import { NewResourcesDialogComponent } from './new-resources-dialog/new-resources-dialog.component';

@NgModule({
  declarations: [
    GameViewComponent,
    MapComponent,
    CounterComponent,
    ProgressListComponent,
    LogsComponent,
    NewResourcesDialogComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    GameViewRoutingModule
  ]
})
export class GameViewModule { }
