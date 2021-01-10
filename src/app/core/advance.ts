enum AdvanceTypes {
  Tools,
  Hunting,
  Fishing,
  Health,
  Clothing,
  Fire,
  Gathering,
  Religion,
  Shelter,
  Prey,
  Art
}

interface advancePrototype {
  label: string,
  type: number,
}

const initAdvancesList: advancePrototype[] = [
  { label: 'Zioła lecznicze', type: 3 },
];

export class Advance {
  id: number;
  label: string;
  type: string;
  discovered: boolean;

  constructor(id: number){
    this.id = id;
    this.label = initAdvancesList[id].label;
    this.type = AdvanceTypes[initAdvancesList[id].type];
    this.discovered = false;
  }
}

// TODO: move to file
export class AdvancesManager {
  constructor(){}

  static createAdvancesList(){
    const advancesList: Advance[] = [];
    for (let i=0; i < initAdvancesList.length; i++) {
      const advance = new Advance(i);
      advancesList.push(advance);
    }
    return advancesList;
  }
}

