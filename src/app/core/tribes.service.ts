import { Injectable } from '@angular/core';
import { AdvancesService } from './advances/advances.service';
import { IResource } from './engine/resources';
import { LocalStorageService } from './local-storage.service';
import { RngService } from './rng.service';
import { Tribe, defaultTribes } from './tribe'

export const MAX_PLAYERS = defaultTribes.length;
export interface IControlledStatus {
  controlledByPlayer: boolean,
  id: number;
}

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

  getIsControlledStatus(){
    return this.list.map(tribe=>({
      controlledByPlayer: tribe.controledByPlayer,
      id: tribe.id
    }))
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

  setNewResources(id: number, newResources: IResource[]){
    const index = this.list.findIndex(tribe=>tribe.id===id)
    this.list[index].newResources = newResources;
  }
}
