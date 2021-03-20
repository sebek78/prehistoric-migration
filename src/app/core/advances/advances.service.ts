import { Injectable } from '@angular/core';
import Advance from './advance'
import { initAdvancesList } from './initAdvancesList';

@Injectable({
  providedIn: 'root'
})
export class AdvancesService {

  private advances: Advance[];

  constructor() {
    this.advances = this.createAdvancesList()
  }

  private createAdvancesList(){
    const advancesList: Advance[] = [];
    for (let i=0; i < initAdvancesList.length; i++) {
      const advance = new Advance(i);
      advancesList.push(advance);
    }
    return advancesList;
  }

  public getAdvancesList(){
    return this.advances
  }
}
