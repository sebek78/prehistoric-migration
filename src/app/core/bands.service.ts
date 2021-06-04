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
    console.log(index, this.bands[index]);
  }
}
