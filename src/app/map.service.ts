import { Injectable } from '@angular/core';

export interface IField {
  x: number,
  y: number,
  id: number,
  water: boolean
}

@Injectable({
  providedIn: 'root'
})
export class MapService {

  fields: Array<IField> = []

  constructor() { 
    this.createMap()
  }

  MAP_WIDTH = 6;
  MAP_HEIGHT = 6;
  WATER_FIELDS = 6;

  createMap(){
    for (let y = 0; y < this.MAP_HEIGHT; y++) {
      for (let x = 0; x < this.MAP_WIDTH; x++) {
        const id = y * this.MAP_WIDTH + x;
        const field = {
          x,
          y,
          id,
          water: false
        }
        this.fields.push(field);
      }
    }
  }
}
