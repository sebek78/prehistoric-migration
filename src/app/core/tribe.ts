import Advance from './advances/advance'
import { AdvanceTypes } from './advances/initAdvancesList'

export const defaultTribes = [
  {
    name: "Tygrysy",
    color: "#ff3300",  //orange
  },
  {
    name: "Niedźwiedzie",
    color: "#262626", // graphite
  },
  {
    name: "Wilki",
    color: "#737373", //grey
  },
  {
    name: "Mamuty",
    color: "#4d2600", //brown
  },
];

export class Tribe {
  name: string;
  color: string;
  controledByPlayer: boolean;
  id: number;
  advances: Advance[] = [];
  undiscoveredAdvances: Advance[];
  discoveredAdvances: Advance[] = [];
  // newResources: Resource[] = [];

  constructor(index: number, undiscoveredAdvances: Advance[]) {
    this.name = defaultTribes[index].name;
    this.color = defaultTribes[index].color;
    this.controledByPlayer = false;
    this.id = index;
    this.undiscoveredAdvances = undiscoveredAdvances;
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
