import Advance from './advance'
import { initAdvancesList } from './initAdvancesList'

export default class AdvancesManager {

  constructor() { }

  static createAdvancesList(){
    const advancesList: Advance[] = [];
    for (let i=0; i < initAdvancesList.length; i++) {
      const advance = new Advance(i);
      advancesList.push(advance);
    }
    return advancesList;
  }
}
