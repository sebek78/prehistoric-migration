import { Injectable } from '@angular/core';
import { clone } from 'ramda';
import { LocalStorageService } from './local-storage.service';
import { MapService } from './map.service';

export interface IBand {
  ownerId: number;
  size: number;
  x: number;
  y: number;
}

@Injectable({
  providedIn: 'root',
})
export class BandsService {
  private INIT_GAME_BANDS_SIZE = 6;
  public bands: IBand[];

  constructor(
    private mapService: MapService,
    private localStorageService: LocalStorageService
  ) {
    const savedBands = this.localStorageService.getBandsServiceSavedData();
    this.bands = savedBands ? savedBands : [];
  }

  createBand(ownerId: number = -1, size: number, x: number, y: number) {
    const newBand = {
      ownerId,
      size,
      x,
      y,
    };
    this.bands.push(newBand);
  }

  getBands() {
    return this.bands;
  }

  getBandsById(id: number) {
    return this.bands.filter((band) => band.ownerId === id);
  }

  getBandsByPosition(x: number, y: number) {
    return this.bands.filter((band) => band.x === x && band.y === y);
  }

  getNumberOfSettledFieldsById(id: number) {
    return this.bands.reduce((num, band) => {
      return band.ownerId === id ? (num += 1) : num;
    }, 0);
  }

  createFirstBands() {
    const map = this.mapService.getMap();
    let updatedMap = map.map((field) => {
      const updatedField = clone(field);
      if (updatedField.settled !== -1) {
        this.createBand(
          updatedField.settled,
          this.INIT_GAME_BANDS_SIZE,
          updatedField.x,
          updatedField.y
        );
      }
      delete updatedField.settled;
      return updatedField;
    });
    this.mapService.updateMap(updatedMap);
  }

  findBandIndexByCoords(x: number, y: number) {
    return this.bands.findIndex((band) => band.x === x && band.y === y);
  }

  findMinBandsIndex(id: number) {
    const playerBands = this.bands.filter((band) => band.ownerId === id);
    let min = playerBands.reduce(
      (min, band) => (band.size < min ? band.size : min),
      Number.MAX_SAFE_INTEGER
    );
    const minBands = playerBands.filter((band) => band.size === min);
    if (minBands.length === 1) {
      return this.findBandIndexByCoords(minBands[0].x, minBands[0].y);
    } else {
      const randomIndex = Math.floor(Math.random() * minBands.length);
      return this.findBandIndexByCoords(
        minBands[randomIndex].x,
        minBands[randomIndex].y
      );
    }
  }

  insertNewBand(index: number) {
    this.bands[index].size += 1;
  }

  selectMaxSizeBand(id: number) {
    const aiPlayerBands = this.getBandsById(id);

    let selectedBand;
    const max = aiPlayerBands.reduce(
      (max, band) => (band.size > max ? band.size : max),
      0
    );
    const maxSizeBands = aiPlayerBands.filter((band) => band.size === max);
    if (maxSizeBands.length === 1) {
      selectedBand = maxSizeBands[0];
    } else {
      const randomIndex = Math.floor(Math.random() * maxSizeBands.length);
      selectedBand = maxSizeBands[randomIndex];
    }
    return selectedBand;
  }

  moveBand(id: number, x: number, y: number, newX: number, newY: number) {
    const sourceBandIndex = this.bands.findIndex(
      (band) => band.ownerId === id && band.x === x && band.y === y
    );
    this.bands[sourceBandIndex].size -= 1;
    const targetBandIndex = this.bands.findIndex(
      (band) => band.ownerId === id && band.x === newX && band.y === newY
    );
    if (targetBandIndex === -1) {
      this.createBand(id, 1, newX, newY);
    } else {
      this.bands[targetBandIndex].size += 1;
    }
  }

  playerHasBandOnField(ownerId: number, x: number, y: number) {
    return (
      this.bands.find(
        (band) => band.x === x && band.y === y && band.ownerId === ownerId
      ) !== undefined
    );
  }

  removeEmptyBands() {
    this.bands = this.bands.filter((band) => band.size > 0);
  }
}
