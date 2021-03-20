import Advance from './advances/advance'
import { AdvanceTypes } from './advances/initAdvancesList'

const defaultTribes = [
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

export class Tribe {
  name: string;
  color: string;
  controledByPlayer: boolean;
  id: number;
  advances: Advance[];
  undiscoveredAdvances: Advance[];
  discoveredAdvances: Advance[];

  constructor(index: number, undiscoveredAdvances: Advance[]) {
    this.name = defaultTribes[index].name;
    this.color = defaultTribes[index].color;
    this.controledByPlayer = false;
    this.id = index;
    this.advances = [];
    this.undiscoveredAdvances = undiscoveredAdvances;
    this.discoveredAdvances = [];
  }

  static getTribeColor(index: number){
    return defaultTribes[index].color;
  }

  checkAdvancesWinningCondition () {
    const advancesNumber: number[] = [];

    for (const type of Object.values(AdvanceTypes)) {
      const thisTypeNumber = this.advances.reduce((ttn,advance)=> {
        if (advance.type === type) return ttn+= 1;
        return ttn;
      }, 0)
      advancesNumber.push(thisTypeNumber)
    }

    const hasEachTwoTypesOfAdvances = advancesNumber.every(num => num >= 2)

    return {
      hasEachTwoTypesOfAdvances,
      advancesNumber,
    }
  }
}
