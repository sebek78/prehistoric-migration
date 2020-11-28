import Field from "./field";

const MAP_WIDTH = 6;
const MAP_HEIGHT = 6;
// const WATER_FIELDS = 6;

export default class Map {
  constructor() {
    this.fields = [];

    this.createMap();
  }

  createMap() {
    for (let y = 0; y < MAP_HEIGHT; y++) {
      for (let x = 0; x < MAP_WIDTH; x++) {
        const id = y * MAP_WIDTH + x;
        const field = new Field(id, x, y);
        this.fields.push(field);
      }
    }
  }
}
