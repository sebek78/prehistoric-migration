import { MAX_REROLL } from "./constants";
import { Resources } from "./resources";


export class HumanActions {
  public rollAgain: number;

  constructor() {
    this.rollAgain =  MAX_REROLL;
  }

  decreaseReroll = () => {
    this.rollAgain -= 1;
  }

  getRollAgain = () => {
    return this.rollAgain;
  }

  getNextCard = () => {
    const draw = Math.floor(Math.random() * 10)
    this.decreaseReroll()
    return {
      nextCard : Resources.getNextCard(draw),
      rollAgain: this.rollAgain
    }
  }
  resetReroll = () => {
    this.rollAgain =MAX_REROLL
  }
}
