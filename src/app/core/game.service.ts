import { Injectable } from '@angular/core';
import { TribesService } from './tribes.service'
import { BandsService } from './bands.service';
import { MapService } from './map.service'
import { Tribe } from './tribe';

interface WinningCondition {
  id: number;
  settledFields: number;
  advances: boolean;
  turn: number;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(
    private tribesService: TribesService,
    private bandsService: BandsService,
    private mapService: MapService,
  ) { }

  isRunning: boolean = false;
  turn: number = 0;
  winningConditions: WinningCondition[][] = [];

  startGame(selectedTribeId: number) {
    this.isRunning = true;
    this.tribesService.setPlayer(selectedTribeId)
    this.bandsService.createFirstBands(this.mapService.fields);
    this.winningConditions.push(this.checkWinningConditions())
    console.log(this.winningConditions)
  }

  checkWinningConditions(): WinningCondition[] {
    let players = this.tribesService.getTribes();

    return players.map((player: Tribe): WinningCondition => {
      const settledFields = this.bandsService.getNumberOfSettledFieldsById(player.id)
      const hasEachTwoTypesOfAdvances = player.checkAdvancesWinningCondition()
      return {
        id: player.id,
        settledFields,
        advances: hasEachTwoTypesOfAdvances,
        turn: this.turn,
      }
    })
  }
}
