import { Injectable } from '@angular/core';
import { TribesService } from './tribes.service';
import { BandsService } from './bands.service';
import { MapService } from './map.service';
import { Tribe } from './tribe';
import { LocalStorageService } from './local-storage.service';
import { EngineService } from './engine/engine.service';
import { LoggerService } from './engine/logger.service';

export interface WinningCondition {
  id: number;
  settledFields: number;
  progress: boolean;
  advancesSum: number;
}

@Injectable({
  providedIn: 'root',
})
export class GameService {
  savedGameServiceData: any;

  isRunning: boolean = false;
  turn: number = 0;
  winningConditions: WinningCondition[][] = [];

  constructor(
    private tribesService: TribesService,
    private bandsService: BandsService,
    private mapService: MapService,
    private localStorageService: LocalStorageService,
    private engine: EngineService,
    private loggerService: LoggerService
  ) {
    this.savedGameServiceData = localStorageService.getGameServiceSavedData();
    this.isRunning = this.savedGameServiceData?.isRunning || false;
    this.turn = this.savedGameServiceData?.turn || 0;
    this.winningConditions = this.savedGameServiceData?.winningConditions || [];
    if (this.isRunning) this.engine.initControlledStatus();
  }

  startGame(selectedTribeId: number) {
    this.isRunning = true;
    this.tribesService.setPlayer(selectedTribeId);
    this.tribesService.shuffleTribes();
    this.engine.initControlledStatus();
    this.bandsService.createFirstBands();
    this.updateWinningConditions();
    this.saveGame();
    this.nextTurn();
  }

  stopGame() {
    this.isRunning = false;
  }

  saveGame() {
    const save = {
      game: {
        isRunning: this.isRunning,
        turn: this.turn,
        winningConditions: this.winningConditions,
      },
      tribes: this.tribesService.getTribes(),
      map: this.mapService.getMap(),
      bands: this.bandsService.getBands(),
      logs: this.loggerService.getLogs(),
    };
    this.localStorageService.saveGame(JSON.stringify(save));
  }

  getTurn(): number {
    return this.turn;
  }

  nextTurn() {
    this.turn += 1;
    this.engine.setCurrentTurn(this.turn);
    this.updateWinningConditions();
    this.engine.newResources();
    this.saveGame();
  }

  checkWinningConditions(): WinningCondition[] {
    let tribes = this.tribesService.getTribes();

    return tribes.map((tribe: Tribe): WinningCondition => {
      const settledFields = this.bandsService.getNumberOfSettledFieldsById(
        tribe.id
      );

      const { hasEachTwoTypesOfAdvances, advancesNumber } =
        this.tribesService.checkAdvancesWinningCondition(tribe);

      const advancesSum = advancesNumber.reduce(
        (sum, currentValue) => sum + currentValue,
        0
      );

      return {
        id: tribe.id,
        settledFields,
        progress: hasEachTwoTypesOfAdvances,
        advancesSum,
      };
    });
  }

  getLastWinningCondition() {
    return this.winningConditions[this.winningConditions.length - 1];
  }

  updateWinningConditions() {
    this.winningConditions.push(this.checkWinningConditions());
  }
}
