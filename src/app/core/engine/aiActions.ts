import { IResource, Resources } from './resources';
import { MAX_REROLL } from './constants';
import { clone } from 'ramda';
import { IBand } from '../bands.service';
import { IField } from '../map.service';

export class AiActions {
  private BA: number = 0; // the beginning of the advance, theory
  private EA: number = 0; // the end of the advance, practice
  private hasAdvance: boolean = false;

  public newResourcesDecision(newCardsSet: IResource[]) {
    const cards = this.firstCheck(clone(newCardsSet));

    let again = MAX_REROLL;

    for (let i = 0; i < cards.length; i++) {
      if (
        (cards[i].type === 'X' && cards[i].rollAgain && again > 0) ||
        (cards[i].type === 'BA' &&
          cards[i].rollAgain &&
          again > 0 &&
          this.hasAdvance) ||
        (cards[i].type === 'EA' &&
          cards[i].rollAgain &&
          again > 0 &&
          this.hasAdvance) ||
        (cards[i].type === 'BA' &&
          cards[i].rollAgain &&
          again > 0 &&
          !this.hasAdvance &&
          this.BA > 1) ||
        (cards[i].type === 'EA' &&
          cards[i].rollAgain &&
          again > 0 &&
          !this.hasAdvance &&
          this.EA > 1)
      ) {
        this.rollAgain(cards, i);
        again--;
        this.checkAdvance(cards);
      }
    }
    return cards;
  }

  private countCard(cards: IResource[], type: string) {
    return cards.reduce((sum, card) => (card.type === type ? sum + 1 : sum), 0);
  }

  private firstCheck(cards: IResource[]) {
    this.BA = this.countCard(cards, 'BA');
    this.EA = this.countCard(cards, 'EA');
    this.hasAdvance = this.BA > 0 && this.EA > 0;

    if (!this.hasAdvance) {
      return cards;
    } else {
      this.BA -= 1;
      this.EA -= 1;
      return this.setAdvance(cards);
    }
  }

  setAdvance(cards: IResource[]) {
    let advL = 1;
    let advR = 1;

    return cards.map((card) => {
      if (card.type === 'BA') {
        advL -= 1;
        return advL === 0 ? { ...card, rollAgain: false } : card;
      } else if (card.type === 'EA') {
        advR -= 1;
        return advR === 0 ? { ...card, rollAgain: false } : card;
      } else {
        return card;
      }
    });
  }

  rollAgain(cards: IResource[], index: number) {
    if (cards[index].rollAgain) {
      if (cards[index].type === 'BA') this.BA--;
      if (cards[index].type === 'EA') this.EA--;
      const draw = Math.floor(Math.random() * 10);
      cards[index] = Resources.getNextCard(draw);
      if (draw === 4) this.BA++;
      if (draw === 5) this.EA++;
    }
  }

  checkAdvance(cards: IResource[]) {
    if (!this.hasAdvance) {
      let cLA = this.countCard(cards, 'BA');
      let cRA = this.countCard(cards, 'EA');

      if (cLA >= 1 && cRA >= 1) {
        this.BA -= 1;
        this.EA -= 1;
        this.hasAdvance = true;
        this.setAdvance(cards);
      }
    }
  }

  public makeMove(availableFields: IField[]) {
    const randomIndex = Math.floor(Math.random() * availableFields.length);
    const selectedField = availableFields[randomIndex];
    return selectedField;
  }
}
