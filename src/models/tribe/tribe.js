import Player from "./player";

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

class Tribe extends Player {
  constructor(index, isHuman = false) {
    super(isHuman);
    this.name = defaultTribes[index].name;
    this.color = defaultTribes[index].color;
    this.isPlayer = this.isPlayer;
  }
  isPlayer(index) {
    return this.list[index].isPlayer;
  }
}

export default Tribe;
