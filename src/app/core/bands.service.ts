import { Injectable  } from '@angular/core';
import { clone } from 'ramda'
import { LocalStorageService } from './local-storage.service';
import { MapService } from './map.service'

export interface IBand {
  ownerId: number,
  size: number,
  x: number,
  y: number
}

@Injectable({
  providedIn: 'root'
})
export class BandsService {
  private INIT_GAME_BANDS_SIZE = 6;
  public bands: IBand[];

  constructor(
    private mapService: MapService,
    private localStorageService: LocalStorageService
  ) {
    const savedBands = this.localStorageService.getBandsServiceSavedData()
    this.bands = savedBands ? savedBands : []
  }

  createBand(ownerId:number = -1, size:number, x:number, y:number){
    const newBand = {
      ownerId,
      size,
      x,
      y,
    }
    this.bands.push(newBand)
  }

  getBands(){
    return this.bands
  }

  getBandsByPosition(x:number, y:number){
    return this.bands.filter(band=>band.x===x && band.y===y)
  }

  getNumberOfSettledFieldsById(id:number) {
    return this.bands.reduce((num, band) => {
      return band.ownerId === id ? num += 1 : num
    }, 0);
  }

  createFirstBands(){
    const map = this.mapService.getMap();
    let updatedMap = map.map(field=>{
      const updatedField = clone(field);
      if(updatedField.settled !== -1) {
        this.createBand(
          updatedField.settled,
          this.INIT_GAME_BANDS_SIZE,
          updatedField.x,
          updatedField.y
        )
      }
      delete updatedField.settled;
      return updatedField
    })
    this.mapService.updateMap(updatedMap);
  }
}
