import Advance from './advances/advance';
import { AdvanceTypes } from './advances/initAdvancesList';
import { IResource } from './engine/resources';

export const defaultTribes = [
  {
    name: 'Tygrysy',
    color: '#ff3300', //orange
  },
  {
    name: 'Niedźwiedzie',
    color: '#262626', // graphite
  },
  {
    name: 'Wilki',
    color: '#737373', //grey
  },
  {
    name: 'Mamuty',
    color: '#4d2600', //brown
  },
];

export class Tribe {
  name: string;
  color: string;
  controlledByPlayer: boolean;
  id: number;
  advances: Advance[] = [];
  undiscoveredAdvances: Advance[];
  discoveredAdvances: Advance[] = [];
  newResources: IResource[] = [];
  movement: number = 0;

  constructor(index: number, undiscoveredAdvances: Advance[]) {
    this.name = defaultTribes[index].name;
    this.color = defaultTribes[index].color;
    this.controlledByPlayer = false;
    this.id = index;
    this.undiscoveredAdvances = undiscoveredAdvances;
  }
}
