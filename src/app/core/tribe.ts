import Advance from './advances/advance'
import { AdvanceTypes } from './advances/initAdvancesList'

const defaultTribes = [
  {
    name: "Tygrysy 300",
    color: "#ff3300",  //orange
  },
  {
    name: "Niedźwiedzie 26",
    color: "#262626", // graphite
  },
  {
    name: "Wilki 73",
    color: "#737373", //grey
  },
  {
    name: "Mamuty 600",
    color: "#4d2600", //brown
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
