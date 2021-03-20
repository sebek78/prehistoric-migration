import { initAdvancesList } from './initAdvancesList'

export default class Advance {
  id: number;
  label: string;
  type: string;

  constructor(id: number){
    this.id = id;
    this.label = initAdvancesList[id].label;
    this.type = initAdvancesList[id].type;
  }
}
