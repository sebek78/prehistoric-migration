import { Injectable } from '@angular/core';
import { RngService } from './rng.service'
import { BandsService } from './bands.service'

export interface IField {
  x: number,
  y: number,
  id: number,
  water: boolean,
  settled?: number,
}

@Injectable({
  providedIn: 'root'
})
export class MapService {

  fields: Array<IField> = []
  MAP_WIDTH = 6;
  MAP_HEIGHT = 6;
  WATER_FIELDS = 6;

  constructor(
    private rngService: RngService,
    private bandsService: BandsService
  ) {
    this.createMap()
  }

  createMap(){
    for (let y = 0; y < this.MAP_HEIGHT; y++) {
      for (let x = 0; x < this.MAP_WIDTH; x++) {
        const id = y * this.MAP_WIDTH + x;
        const field = {
          x,
          y,
          id,
          water: false,
          settled: -1,
        }
        this.fields.push(field);
      }
    }
    this.randomizeWaterFields();
    this.randomizeStartingPosition();
  }

  findFieldIndex(x: number, y: number) {
    return this.fields.findIndex(el=> el.x ===x && el.y ===y);
  }

  isWaterField(x: number,y: number): boolean {
    let field = this.fields.find(field => field.x === x && field.y === y)
    return field ? field.water : false
  }

  setWaterField(x: number, y: number): void {
    const index = this.findFieldIndex(x,y)
    this.fields[index].water=true
  }

  randomizeWaterFields(){
    let fieldsToDraw = 6;

    // get external fields
    const externalFields = this.fields.filter(field=>
      field.y === 0 || //top
      field.y === this.MAP_HEIGHT -1 || //bottom
      field.x === 0 && field.y > 0 && field.y < this.MAP_HEIGHT -1 || //left
      field.x === this.MAP_WIDTH -1 && field.y > 0 && field.y < this.MAP_HEIGHT -1 // rigth
    )
    // draw
    while (fieldsToDraw > 0) {
      const index = this.rngService.draw(externalFields.length);
      const field = externalFields[index];
      if( // corner side fields
        // top left
        field.x === 1 && field.y === 0 && !field.water && !this.isWaterField(0,1) ||
        field.x === 0 && field.y === 1 && !field.water && !this.isWaterField(1,0) ||
        // top right
        field.x === this.MAP_WIDTH - 2 && field.y === 0 && !field.water && !this.isWaterField(this.MAP_WIDTH - 1,1) ||
        field.x === this.MAP_WIDTH - 1 && field.y === 1 && !field.water && !this.isWaterField(this.MAP_WIDTH - 2, 0) ||
        // bottom left
        field.x === 0 && field.y === this.MAP_HEIGHT - 2 && !field.water && !this.isWaterField(this.MAP_HEIGHT -1, 1) ||
        field.x === 1 && field.y === this.MAP_HEIGHT - 1 && !field.water && !this.isWaterField(1,this.MAP_HEIGHT -1) ||
        // bottom right
        field.x === this.MAP_WIDTH - 1 && field.y === this.MAP_HEIGHT -2 && !field.water && !this.isWaterField(this.MAP_WIDTH - 2, this.MAP_HEIGHT - 1) ||
        field.x === this.MAP_WIDTH - 2 && field.y === this.MAP_HEIGHT -1 && !field.water && !this.isWaterField(this.MAP_WIDTH - 1, this.MAP_HEIGHT - 2)
      ) {
        externalFields[index].water = true
        this.setWaterField(field.x,field.y)
        fieldsToDraw--;
      }
      if (( // corner fields and other external fields
        field.x === 0 && field.y === 0 ||
        field.x === this.MAP_WIDTH -1 && field.y === 0 ||
        field.x === 0 && field.y === this.MAP_HEIGHT -1 ||
        field.x === this.MAP_WIDTH -1 && field.y === this.MAP_HEIGHT -1 ||
        field.x > 1 && field.x < this.MAP_WIDTH - 3 && field.y === 0 ||
        field.x > 1 && field.x < this.MAP_WIDTH - 3 && field.y === this.MAP_HEIGHT -1 ||
        field.y > 1 && field.y < this.MAP_HEIGHT -3 && field.x === 0 ||
        field.y > 1 && field.y < this.MAP_HEIGHT -3 && field.x === this.MAP_WIDTH -1
      ) && !field.water) {
        externalFields[index].water = true
        this.setWaterField(field.x,field.y)
        fieldsToDraw--;
      }
    }
  }

  randomizeStartingPosition(){
    const MIN_VALID_DISTANCE = 1.5;

    const drawField = () => {
      const x = this.rngService.draw(this.MAP_WIDTH);
      const y = this.rngService.draw(this.MAP_HEIGHT);
      let index = this.findFieldIndex(x,y);
      return {field: this.fields[index], index };
    }

    const checkDistance = (arr: IField[], x: number, y: number) => {
      const distances: number[] = [];
      arr.forEach(el => {
         if (el.settled !== -1) {
            let d = Math.sqrt((Math.pow((el.x - x), 2)) + (Math.pow((el.y - y), 2)));
            if(d !== 0 ) distances.push(d);
         }
      })
      let min = Math.min(...distances);
      return min > MIN_VALID_DISTANCE;
    }

    let draw = 3
    while (draw >= 0) {
      let { field, index } = drawField();
      if(draw === 3 && !field.water ) {
        this.fields[index] = {...field, settled: draw};
        draw--;
      } else {
        let { x,y } = field;
        if(!field.water && field.settled === -1) {
          let validDistance = checkDistance(this.fields, x,y);
          if (validDistance) {
            this.fields[index] = {...field, settled: draw};
            draw--;
          }
        }
      }
    }
  }
}
