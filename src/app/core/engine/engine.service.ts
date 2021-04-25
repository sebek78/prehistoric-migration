import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BandsService } from '../bands.service';
import { RngService } from '../rng.service';
import { TribesService, MAX_PLAYERS, IControlledStatus } from '../tribes.service';
import { AiActions } from './aiActions';
import { MIN_ROLLS, MAX_ROLLS,D10 } from './constants';
import { LoggerService } from './logger.service';
import { Resources, IResource } from './resources'
import { logTypes } from './log'

@Injectable({
  providedIn: 'root'
})
export class EngineService {
  maxPlayers: number;
  tribesStatus: IControlledStatus[];
  aiActions: AiActions;
  currentTurn: number;
  currentPlayerId: number = 0;
  currentIndex: number = 0;
  private messageSource = new BehaviorSubject(false);
  newResourcesDialogStatus = this.messageSource.asObservable();

  constructor(
    private tribesService: TribesService,
    private bandsService: BandsService,
    private rngService: RngService,
    private loggerService: LoggerService
  ) {
    this.maxPlayers = MAX_PLAYERS
    this.aiActions  = new AiActions()
  }

  initControlledStatus(){
    this.tribesStatus = this.tribesService.getIsControlledStatus()
  }

  phaseLoop() {
    if (this.currentIndex >= MAX_PLAYERS) {
      this.currentIndex = 0;
      return;
    } else {
      this.currentPlayerId = this.tribesStatus[this.currentIndex].id;
    }

    if (!this.tribesStatus[this.currentIndex].controlledByPlayer) {
      this.aiNewResuorces()
      this.currentIndex += 1
      this.phaseLoop()
    } else {
      this.playerNewResuorces()
      this.currentIndex += 1
    }
  }

  setCurrentTurn( currentTurn: number){
    this.currentTurn = currentTurn;
  }

  closeNewResourcesDialog() {
    this.messageSource.next(false)
  }

  /* new Resources phase */
  newResources(){
    this.phaseLoop()
  }

  aiNewResuorces = () => {
    console.log('AI', this.currentPlayerId)
    let cards = this.drawNewResources(this.currentPlayerId)
    cards = this.aiActions.newResourcesDecision(cards)
    const cardsLog = `Player Id:${this.currentPlayerId} ${cards.map(card=>card.type).join(',')}`;
    this.loggerService.addLog(logTypes.phase1,this.currentTurn, cardsLog)
    this.tribesService.setNewResources(this.currentPlayerId, cards)
  }

  playerNewResuorces = () => {
    console.log('H', this.currentPlayerId)
    let cards = this.drawNewResources(this.currentPlayerId)
    const cardsLog = `Player Id:${this.currentPlayerId} ${cards.map(card=>card.type).join(',')}`;
    this.loggerService.addLog(logTypes.phase1,this.currentTurn, ' [ H ] ' + cardsLog)
    this.messageSource.next(true)
  }

  drawNewResources(id: number) {
    const fieldsNumber = this.bandsService.getNumberOfSettledFieldsById(id);
    const additionalRolls = Math.floor(fieldsNumber / 3); // one dice roll for each 3 fields extra
    const diceRollNumber = additionalRolls > 3 ? MAX_ROLLS : MIN_ROLLS + additionalRolls
    const resourcesSet = new Resources().defaultSet()
    let cards: IResource[] = [];

    for (let i=0; i< diceRollNumber; i++) {
      const draw = this.rngService.draw(D10);
      cards.push(resourcesSet[draw]);
    }
    return cards
  }
}
