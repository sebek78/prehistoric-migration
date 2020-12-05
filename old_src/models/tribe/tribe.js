export const defaultTribes = [
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

class Tribe {
  constructor(index, control = false) {
    this.name = defaultTribes[index].name;
    this.color = defaultTribes[index].color;
    this.controlByPlayer = control;
    this.setPlayer = this.setPlayer;
  }
  setPlayer() {
    this.controlByPlayer = true;
  }
}

export default Tribe;
