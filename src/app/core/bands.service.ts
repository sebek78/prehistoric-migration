import { Injectable } from '@angular/core';

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
  constructor() { }

  INIT_GAME_BANDS_SIZE = 6;
  bands: IBand[] =[];


  createBand(ownerId:number = -1, size:number, x:number, y:number){
    const newBand = {
      ownerId,
      size,
      x,
      y,
    }
    this.bands.push(newBand)
  }

  getBandsByPosition(x:number, y:number){
    return this.bands.filter(band=>band.x===x && band.y===y)
  }

}
