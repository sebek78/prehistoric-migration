import { Injectable } from '@angular/core';
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

  getTribes() {
    return this.list
  }

  createTribes() {
    for (let i = 0; i < MAX_PLAYERS; i++) {
      let tribe = new Tribe(i);
      this.list.push(tribe);
    }
  }

  getTribe(index: number) {
    return this.list[index];
  }

  setPlayer(index: number){
    this.list[index].controledByPlayer = true
  }
}
