import { Injectable } from '@angular/core';
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
  it: IterableIterator<number>;
  aiActions: AiActions;
  currentTurn: number;
  currentPlayerId: number;

  constructor(
    private tribesService: TribesService,
    private bandsService: BandsService,
    private rngService: RngService,
    private loggerService: LoggerService
  ) {
    this.maxPlayers = MAX_PLAYERS
    this.it = this.makeIterator(MAX_PLAYERS)
    this.aiActions  = new AiActions()
  }

  initControlledStatus(){
    this.tribesStatus = this.tribesService.getIsControlledStatus()
  }

  *makeIterator (MAX_PLAYERS:number) {
    for (let i = 0; i < MAX_PLAYERS; i++) {
     yield i;
    }
  }

  phaseLoop(aiAction:any, humanAction:any) {
    let index = 0; // current tribes array index
    while (index<this.maxPlayers) {
      this.currentPlayerId = this.tribesStatus[index].id;
     if (!this.tribesStatus[index].controlledByPlayer) {
        aiAction()
        this.it.next()
      } else {
        humanAction(this.it)
      }
      index++
    }
  }

  setCurrentTurn( currentTurn: number){
    this.currentTurn = currentTurn;
  }

  /* new Resources phase */
  newResources(){
    this.phaseLoop(this.aiNewResuorces, this.playerNewResuorces)
  }

  aiNewResuorces = () => {
    let cards = this.drawNewResources(this.currentPlayerId)
    cards = this.aiActions.newResourcesDecision(cards)
    const cardsLog = `Player Id:${this.currentPlayerId} ${cards.map(card=>card.type).join(',')}`;
    this.loggerService.addLog(logTypes.phase1,this.currentTurn, cardsLog)
    this.tribesService.setNewResources(this.currentPlayerId, cards)
  }

  playerNewResuorces = (it: IterableIterator<number>) => {
    console.log('Human action ', this.currentPlayerId)
    let cards = this.drawNewResources(this.currentPlayerId)
    const cardsLog = `Player Id:${this.currentPlayerId} ${cards.map(card=>card.type).join(',')}`;
    this.loggerService.addLog(logTypes.phase1,this.currentTurn, cardsLog)
    // process dialog
    it.next()
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
