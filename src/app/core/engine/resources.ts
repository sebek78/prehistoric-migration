/* Bands, Move, BeginAdvance, EndAdvance, Nothing */
export const initResourceTypes = ["B","B","M", "M", "BA", "EA", "X","X","X","X"];

interface ILabels {
  [name: string]: string
}

const labels: ILabels = {
  B: 'Nowa banda',
  M: 'Migracja',
  X: 'Nic',
  BA: 'Teoria',
  EA: 'Praktyka'
}

export interface IResource {
  type: string;
  rollAgain: boolean;
  label: string;
}

export class Resources {
  set: IResource[] = [];

  constructor() {
     this.set = initResourceTypes.map(type=>({ type, rollAgain: true, label: labels[type] }));
  }

  defaultSet(){
    return this.set
  }

  static getNextCard(draw: number){
    const type  = initResourceTypes[draw];
    return {
      type,
      rollAgain: false,
      label: labels[type]
    }
  }
}
