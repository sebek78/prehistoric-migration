import { Injectable } from '@angular/core';
import { BandsService } from '../bands.service';
import { RngService } from '../rng.service';
import { TribesService, MAX_PLAYERS, IControlledStatus } from '../tribes.service';
import { AiActions } from './aiActions';
import { MIN_ROLLS, MAX_ROLLS,D10 } from './constants';
import { Resources, IResource, initResourceTypes } from './resources'

@Injectable({
  providedIn: 'root'
})
export class EngineService {
  maxPlayers: number;
  tribesStatus: IControlledStatus[];
  it: IterableIterator<number>;
  aiActions: AiActions;

  constructor(
    private tribesService: TribesService,
    private bandsService: BandsService,
    private rngService: RngService,
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
     if (!this.tribesStatus[index].controlledByPlayer) {
        aiAction(this.tribesStatus[index].id)
        this.it.next()
      } else {
        humanAction(this.tribesStatus[index].id,this.it)
      }
      index++
    }
  }

  /* new Resources phase */
  newResources(){
    this.phaseLoop(this.aiNewResuorces, this.playerNewResuorces)
  }

  aiNewResuorces = (id:number) => {
    console.log('AI action ', id)
    let cards = this.drawNewResources(id)
    cards = this.aiActions.newResources(cards)
    console.log(cards)
    // ready to process
  }

  playerNewResuorces = (id: number, it: IterableIterator<number>) => {
    console.log('Human action ', id)
    let cards = this.drawNewResources(id)
    console.log(cards)
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
