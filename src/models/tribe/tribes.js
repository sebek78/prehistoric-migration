import Tribe from "./tribe";

const MAX_PLAYERS = 4;

class Tribes {
  constructor() {
    this.list = [];
    this.tribe = this.getTribe;
    this.setPlayer = this.setPlayer;

    this.createTribes();
  }

  createTribes() {
    for (let i = 0; i < MAX_PLAYERS; i++) {
      let tribe = new Tribe(i);
      this.list.push(tribe);
    }
  }

  getTribe(index) {
    return this.list[index];
  }

  setPlayer(index) {
    this.list = this.list.map((tribe) => ({
      ...tribe,
      controlByPlayer: false,
    }));
    this.list[index].setPlayer();
  }
}

export default Tribes;
