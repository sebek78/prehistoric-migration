import { Advance } from './advance'
import { AdvancesManager } from './advance'

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
  constructor(index: number) {
    this.name = defaultTribes[index].name;
    this.color = defaultTribes[index].color;
    this.controledByPlayer = false;
    this.id = index;
    this.advances = AdvancesManager.createAdvancesList();
  }

  static getTribeColor(index: number){
    return defaultTribes[index].color;
  }
}
