import Tribe from "./tribe";

const MAX_PLAYERS = 4;

class Tribes {
  constructor(humanPlayerIndex = 0) {
    this.list = [];
    this.tribe = this.getTribe;

    this.createTribes(humanPlayerIndex);
  }

  getTribe(index) {
    return this.list[index];
  }

  createTribes(humanPlayerIndex) {
    for (let i = 0; i < MAX_PLAYERS; i++) {
      let tribe;
      if (i === humanPlayerIndex) {
        tribe = new Tribe(i, true);
      } else {
        tribe = new Tribe(i);
      }
      this.list.push(tribe);
    }
  }
}

export default Tribes;
