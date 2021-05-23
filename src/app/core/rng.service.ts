import { Injectable } from '@angular/core';
import { Tribe } from "./tribe"

@Injectable({
  providedIn: 'root'
})
export class RngService {

  constructor() { }

  public draw(value: number) {
    return Math.floor(Math.random() * value);
  }

  public shuffleTribes(array: Tribe[]){
    return array
      .map((tribe) => ({ sort: Math.random(), value: tribe }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);
    }
}
