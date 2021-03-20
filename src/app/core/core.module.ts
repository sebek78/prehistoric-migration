import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BandsService } from './bands.service';
import { GameService } from './game.service';
import { MapService } from './map.service';
import { RngService } from './rng.service';
import { TribesService } from './tribes.service';
import { AdvancesService } from './advances/advances.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    AdvancesService,
    BandsService,
    GameService,
    MapService,
    RngService,
    TribesService
  ],
})
export class CoreModule { }
