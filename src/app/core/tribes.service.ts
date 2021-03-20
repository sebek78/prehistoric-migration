import { Injectable } from '@angular/core';
import { AdvancesService } from './advances/advances.service';
import { Tribe } from './tribe'

export const MAX_PLAYERS = 4;

@Injectable({
  providedIn: 'root'
})
export class TribesService {
  constructor() {
    this.createTribes();
  }

  list: Array<Tribe> = []
  advancesService = new AdvancesService()

  getTribes() {
    return this.list
  }

  createTribes() {
    for (let i = 0; i < MAX_PLAYERS; i++) {
      let undiscoveredAdvances = this.advancesService.getAdvancesList()
      let tribe = new Tribe(i, undiscoveredAdvances);
      this.list.push(tribe);
    }
  }

  getTribe(index: number) {
    return this.list[index];
  }

  getTribeNames(){
    return this.list.map(tribe=>tribe.name)
  }

  setPlayer(index: number){
    this.list[index].controledByPlayer = true
  }
}
