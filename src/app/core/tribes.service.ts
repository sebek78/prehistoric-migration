import { Injectable } from '@angular/core';
import { AdvancesService } from './advances/advances.service';
import { AdvanceTypes } from './advances/initAdvancesList';
import { IResource } from './engine/resources';
import { LocalStorageService } from './local-storage.service';
import { RngService } from './rng.service';
import { Tribe, defaultTribes } from './tribe';

export const MAX_PLAYERS = defaultTribes.length;
export interface IControlledStatus {
  controlledByPlayer: boolean;
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class TribesService {
  private list: Array<Tribe> = [];

  constructor(
    private localStorageService: LocalStorageService,
    private advancesService: AdvancesService,
    private rngService: RngService
  ) {
    const tribeServiceSavedData =
      this.localStorageService.getTribesServiceSavedData();
    this.list = tribeServiceSavedData
      ? tribeServiceSavedData
      : this.createTribes();
  }

  getTribes() {
    return this.list;
  }

  createTribes() {
    const tribesList = [];
    for (let i = 0; i < MAX_PLAYERS; i++) {
      let undiscoveredAdvances = this.advancesService.getAdvancesList();
      let tribe = new Tribe(i, undiscoveredAdvances);
      tribesList.push(tribe);
    }
    return tribesList;
  }

  findTribeIndex(id: number) {
    return this.list.findIndex((tribe) => tribe.id === id);
  }

  getIsControlledStatus() {
    return this.list.map((tribe) => ({
      controlledByPlayer: tribe.controlledByPlayer,
      id: tribe.id,
    }));
  }

  getLostGame(id: number) {
    return this.list.find((tribe) => tribe.id === id)?.lostGame;
  }

  setLostGame(index: number) {
    this.list[index].lostGame = true;
  }

  getTribe(index: number) {
    return this.list[index];
  }

  getTribeColor(id: number) {
    return this.list.find((tribe) => tribe.id === id)?.color || 'red';
  }

  getTribeName(id: number) {
    return this.list.find((tribe) => tribe.id === id)?.name || '?';
  }

  getTribeControlledByPlayer(id: number) {
    return (
      this.list.find((tribe) => tribe.id === id)?.controlledByPlayer || false
    );
  }

  getHumanPlayerTribe() {
    return this.list.find((tribe) => tribe.controlledByPlayer);
  }

  getNewBandsNumber(id: number) {
    const index = this.findTribeIndex(id);
    const newBandsNumber = this.list[index].newResources.reduce(
      (sum: number, newResource: IResource) => {
        return newResource.type === 'B' ? sum + 1 : sum;
      },
      0
    );
    return newBandsNumber;
  }

  getNewBands() {
    return this.list.map((tribe) => ({
      tribeId: tribe.id,
      newBandsNumber: this.getNewBandsNumber(tribe.id),
    }));
  }

  setPlayer(index: number) {
    this.list[index].controlledByPlayer = true;
  }

  shuffleTribes() {
    this.list = this.rngService.shuffleTribes(this.list);
  }

  getPlayerNewResources() {
    const player = this.getHumanPlayerTribe();
    return player?.newResources;
  }

  setNewResources(id: number, newResources: IResource[]) {
    const index = this.findTribeIndex(id);
    this.list[index].newResources = newResources;
  }
  getNewAdvances() {
    return this.list.map((tribe) => {
      const BA = tribe.newResources.findIndex(
        (newResource) => newResource.type === 'BA'
      );
      const EA = tribe.newResources.findIndex(
        (newResource) => newResource.type === 'EA'
      );
      if (BA !== -1 && EA !== -1) {
        return tribe.id;
      } else {
        return -1;
      }
    });
  }
  setNewAdvance(id: number) {
    const index = this.findTribeIndex(id);
    const advancesNumber = this.list[index].undiscoveredAdvances.length;
    const randomIndex = Math.floor(Math.random() * advancesNumber);
    this.list[index].discoveredAdvances.push(
      this.list[index].undiscoveredAdvances[randomIndex]
    );
    this.list[index].undiscoveredAdvances.splice(randomIndex, 1);
  }

  getMovement(id: number) {
    return this.list.find((tribe) => tribe.id === id)?.movement || 0;
  }

  getHumanPlayerMovement() {
    return this.list.find((tribe) => tribe.controlledByPlayer)?.movement || 0;
  }

  setMovement() {
    this.list = this.list.map((tribe) => {
      const movement = tribe.newResources.reduce(
        (sum, card) => (card.type === 'M' ? sum + 1 : sum),
        0
      );
      tribe.movement = movement;
      return tribe;
    });
  }
  decreaseMovement(id: number) {
    const index = this.findTribeIndex(id);
    this.list[index].movement -= 1;
  }

  checkAdvancesWinningCondition = (tribe: Tribe) => {
    const advancesNumber: number[] = [];

    for (const type of Object.values(AdvanceTypes)) {
      const thisTypeNumber = tribe.discoveredAdvances.reduce((ttn, advance) => {
        if (advance.type === type) return (ttn += 1);
        return ttn;
      }, 0);
      advancesNumber.push(thisTypeNumber);
    }

    const hasEachTwoTypesOfAdvances = advancesNumber.every((num) => num >= 2);

    return {
      hasEachTwoTypesOfAdvances,
      advancesNumber,
    };
  };
  getTechnologyLevel(tribeId: number, technology: AdvanceTypes) {
    const index = this.findTribeIndex(tribeId);
    return this.list[index].discoveredAdvances.reduce(
      (sum, advance) => (advance.type === technology ? sum + 1 : sum),
      0
    );
  }
}
