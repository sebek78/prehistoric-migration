import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BandsService } from '../bands.service';
import { RngService } from '../rng.service';
import {
  TribesService,
  MAX_PLAYERS,
  IControlledStatus,
} from '../tribes.service';
import { AiActions } from './aiActions';
import { MIN_ROLLS, MAX_ROLLS, D10 } from './constants';
import { LoggerService } from './logger.service';
import { Resources, IResource } from './resources';
import { logTypes } from './log';
import { HumanActions } from './human-actions';
import { MapService } from '../map.service';

@Injectable({
  providedIn: 'root',
})
export class EngineService {
  maxPlayers: number;
  tribesStatus: IControlledStatus[];
  aiActions: AiActions;
  humanActions: HumanActions;
  currentTurn: number;
  currentPlayerId: number = 0;
  currentIndex: number = 0;
  currentPhase: number = 0;
  private statusSource = new BehaviorSubject(false);
  newResourcesDialogStatus = this.statusSource.asObservable();

  constructor(
    private tribesService: TribesService,
    private bandsService: BandsService,
    private rngService: RngService,
    private loggerService: LoggerService,
    private mapService: MapService
  ) {
    this.maxPlayers = MAX_PLAYERS;
    this.aiActions = new AiActions();
    this.humanActions = new HumanActions();
  }

  initControlledStatus() {
    this.tribesStatus = this.tribesService.getIsControlledStatus();
  }

  phaseLoop() {
    if (this.currentIndex >= MAX_PLAYERS) {
      this.currentIndex = 0;
      this.currentPhase += 1;
    }

    this.currentPlayerId = this.tribesStatus[this.currentIndex].id;

    // new resources
    if (this.currentPhase === 0) {
      if (!this.tribesStatus[this.currentIndex].controlledByPlayer) {
        this.aiNewResuorces();
        this.currentIndex += 1;
        this.phaseLoop();
      } else {
        this.playerNewResuorces();
        this.currentIndex += 1;
      }
      return;
    }
    // set new resources
    if (this.currentPhase === 1) {
      this.setNewBands();
      this.setNewAdvances();
      this.currentPhase += 1;
    }
    // bands movement
    if (this.currentPhase === 2) {
      if (!this.tribesStatus[this.currentIndex].controlledByPlayer) {
        const selectedMaxSizeBand = this.bandsService.selectMaxSizeBand(
          this.currentPlayerId
        );
        const { x, y } = selectedMaxSizeBand;
        const availableFields = this.mapService.getAvailableFields(x, y);
        const selectedField = this.aiActions.makeMove(availableFields);
        const { x: newX, y: newY } = selectedField;
        this.bandsService.moveBand(this.currentPlayerId, x, y, newX, newY);
        this.currentIndex += 1;
        this.phaseLoop();
      } else {
        this.currentIndex += 1;
      }
      return;
    }
    this.currentIndex = 0;
    this.currentPhase = 0;
  }

  setCurrentTurn(currentTurn: number) {
    this.currentTurn = currentTurn;
  }

  closeNewResourcesDialog() {
    this.statusSource.next(false);
    const cards = this.tribesService.getPlayerNewResources() || [];
    const cardsLog = `Player Id:${this.currentPlayerId} ${cards
      .map((card) => card.type)
      .join(',')}`;
    this.loggerService.addLog(
      logTypes.phase1,
      this.currentTurn,
      ' [ H ] ' + cardsLog
    );
  }

  /* new Resources phase */
  newResources() {
    this.humanActions.resetReroll();
    this.phaseLoop();
  }

  aiNewResuorces = () => {
    let cards = this.drawNewResources(this.currentPlayerId);
    cards = this.aiActions.newResourcesDecision(cards);
    const cardsLog = `Player Id:${this.currentPlayerId} ${cards
      .map((card) => card.type)
      .join(',')}`;
    this.loggerService.addLog(logTypes.phase1, this.currentTurn, cardsLog);
    this.tribesService.setNewResources(this.currentPlayerId, cards);
  };

  playerNewResuorces = () => {
    let cards = this.drawNewResources(this.currentPlayerId);
    this.tribesService.setNewResources(this.currentPlayerId, cards);
    this.statusSource.next(true);
  };

  getNextCard = (index: number) => {
    const { nextCard, rollAgain } = this.humanActions.getNextCard();
    const newResources = this.tribesService.getPlayerNewResources() || [];
    if (newResources.length) newResources[index] = nextCard;
    this.tribesService.setNewResources(this.currentPlayerId, newResources);
    return rollAgain;
  };

  drawNewResources(id: number) {
    const fieldsNumber = this.bandsService.getNumberOfSettledFieldsById(id);
    const additionalRolls = Math.floor(fieldsNumber / 3); // one dice roll for each 3 fields extra
    const diceRollNumber =
      additionalRolls > 3 ? MAX_ROLLS : MIN_ROLLS + additionalRolls;
    const resourcesSet = new Resources().defaultSet();
    let cards: IResource[] = [];

    for (let i = 0; i < diceRollNumber; i++) {
      const draw = this.rngService.draw(D10);
      cards.push(resourcesSet[draw]);
    }
    return cards;
  }

  /* set new resources phase */

  setNewBands() {
    const newBands = this.tribesService.getNewBands();
    newBands.forEach(({ tribeId, newBandsNumber }) => {
      while (newBandsNumber > 0) {
        const index = this.bandsService.findMinBandsIndex(tribeId);
        this.bandsService.insertNewBand(index);
        newBandsNumber -= 1;
      }
    });
  }

  setNewAdvances() {
    const newAdvances = this.tribesService.getNewAdvances();
    newAdvances.forEach((id) => {
      if (id !== -1) this.tribesService.setNewAdvance(id);
    });
  }
}
