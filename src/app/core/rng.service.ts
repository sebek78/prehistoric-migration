import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RngService {

  constructor() { }
   
  draw(value: number) {
    return Math.floor(Math.random() * value);
  }
}
