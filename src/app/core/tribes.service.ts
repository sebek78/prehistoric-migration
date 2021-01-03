import { Injectable } from '@angular/core';

export interface ITribe {
  name: string,
  color: string,
  controledByPlayer: boolean,
}

@Injectable({
  providedIn: 'root'
})
export class TribesService {
  constructor() { 
    this.createTribes();
  }

  private defaultTribes = [
    {
      name: "Tygrysy",
      color: "#ff3300",
    },
    {
      name: "Niedźwiedzie",
      color: "#262626",
    },
    {
      name: "Wilki",
      color: "#737373",
    },
    {
      name: "Mamuty",
      color: "#4d2600",
    },
  ];
  MAX_PLAYERS = 4;
  
  list: Array<ITribe> = [] 

  /* Tribes */

  getTribes() { 
    return this.list
  }

  createTribes() {
    for (let i = 0; i < this.MAX_PLAYERS; i++) {
      let tribe = this.createTribe(i);
      this.list.push(tribe);
    }
  }

  /* Tribe */

  createTribe(index: number, control: boolean = false) {
    let tribe: ITribe = {
      name: this.defaultTribes[index].name,
      color: this.defaultTribes[index].color,
      controledByPlayer: control,
    };
    return tribe;
  }

  getTribe(index: number) {
    return this.list[index];
  }

  setPlayer(index: number){
    this.list = this.list.map((tribe) => ({
      ...tribe,
      controledByPlayer: false,
    }));
    this.list[index].controledByPlayer = true
  }

  getTribeColor(index:number){
    return this.defaultTribes[index].color;
  }
}
