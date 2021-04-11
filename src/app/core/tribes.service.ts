import { Injectable } from '@angular/core';
import { AdvancesService } from './advances/advances.service';
import { LocalStorageService } from './local-storage.service';
import { RngService } from './rng.service';
import { Tribe } from './tribe'

export const MAX_PLAYERS = 4;

@Injectable({
  providedIn: 'root'
})
export class TribesService {

  private list: Array<Tribe> = [];

  constructor(
    private localStorageService: LocalStorageService,
    private advancesService: AdvancesService,
    private rngService: RngService
  ) {
    const tribeServiceSavedData = this.localStorageService.getTribesServiceSavedData();
    this.list = tribeServiceSavedData ? tribeServiceSavedData : this.createTribes();
  }

  getTribes() {
    return this.list
  }

  createTribes() {
    const tribesList = []
    for (let i = 0; i < MAX_PLAYERS; i++) {
      let undiscoveredAdvances = this.advancesService.getAdvancesList()
      let tribe = new Tribe(i, undiscoveredAdvances);
      tribesList.push(tribe);
    }
    return tribesList
  }

  getTribe(index: number) {
    return this.list[index];
  }

  getTribeColor(id: number) {
    return this.list.find(tribe=>tribe.id === id)?.color || 'red'
  }

  getTribeName(id: number){
    return this.list.find(tribe=>tribe.id === id)?.name || '?'
  }

  setPlayer(index: number){
    this.list[index].controledByPlayer = true
  }

  shuffleTribes(){
    this.list = this.rngService.shuffleTribes(this.list)
  }
}
