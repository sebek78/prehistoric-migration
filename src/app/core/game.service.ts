import { Injectable } from '@angular/core';
import { TribesService } from './tribes.service'
import { BandsService } from './bands.service';
import { MapService } from './map.service'
import { Tribe } from './tribe';
import { LocalStorageService } from './local-storage.service';

export interface WinningCondition {
  id: number;
  settledFields: number;
  progress: boolean;
  advancesSum: number;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  savedGameSarviceData: any;

  isRunning: boolean = false;
  turn: number = 0;
  winningConditions: WinningCondition[][] = [];

  constructor(
    private tribesService: TribesService,
    private bandsService: BandsService,
    private mapService: MapService,
    private localStorageService: LocalStorageService,
  ) {
      this.savedGameSarviceData = localStorageService.getGameServiceSavedData()
      this.isRunning = this.savedGameSarviceData?.isRunning || false;
      this.turn  = this.savedGameSarviceData?.turn || 0;
      this.winningConditions = this.savedGameSarviceData?.winningConditions || []
  }

  startGame(selectedTribeId: number) {
    this.isRunning = true;
    this.tribesService.setPlayer(selectedTribeId)
    this.bandsService.createFirstBands();
    this.winningConditions.push(this.checkWinningConditions())
    this.saveGame();
  }

  stopGame(){
    this.isRunning = false
  }

  saveGame(){
    const testData={
      game:{
        isRunning: this.isRunning,
        turn: this.turn,
        winningConditions: this.winningConditions,
      },
      tribes: this.tribesService.getTribes(),
      map: this.mapService.getMap(),
      bands: this.bandsService.getBands(),
    };
    this.localStorageService.saveGame(JSON.stringify(testData))
  }

  getTurn(): number {
    return this.turn;
  }

  checkWinningConditions(): WinningCondition[] {
    let players = this.tribesService.getTribes();

    return players.map((player: Tribe): WinningCondition => {
      const settledFields = this.bandsService.getNumberOfSettledFieldsById(player.id)
      const { hasEachTwoTypesOfAdvances, advancesNumber } = player.checkAdvancesWinningCondition()
      const advancesSum = advancesNumber.reduce((sum, currentValue) => (sum + currentValue),0);

      return {
        id: player.id,
        settledFields,
        progress: hasEachTwoTypesOfAdvances,
        advancesSum,
      }
    })
  }
}
