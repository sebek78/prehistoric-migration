import { Injectable } from '@angular/core';
import { TribesService } from './tribes.service'
import { BandsService } from './bands.service';
import { MapService } from './map.service'

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(
    private tribesService: TribesService,
    private bandsService: BandsService,
    private mapService: MapService,
  ) { }

  isRunning = false;
  winningConditions: any = [];  // TODO: add type

  startGame(selectedTribeId: number) {
    this.isRunning = true;
    this.tribesService.setPlayer(selectedTribeId)
    this.bandsService.createFirstBands(this.mapService.fields);
    this.checkWinningConditions(); //TODO: remove it
  }

  checkWinningConditions() {
    let players = this.tribesService.getTribes();
    this.winningConditions = players.map(player => {
      let settledFields = this.bandsService.getNumberOfSettledFieldsById(player.id)
      // TODO: check advances
      return {
        id: player.id,
        settledFields,
      }
    })
    console.log(this.winningConditions)
  }
}
