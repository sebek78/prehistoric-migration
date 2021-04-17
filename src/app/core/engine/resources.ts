/* Bands, Move, BeginAdvance, EndAdvance, Nothing */
export const initResourceTypes = ["B","B","M", "M", "BA", "EA", "X","X","X","X"];

export interface IResource {
  type: string,
  rollAgain: boolean,
}

export class Resources {
  set: IResource[] = [];

  constructor() {
     this.set = initResourceTypes.map(type=>({ type, rollAgain: true }));
  }

  defaultSet(){
    return this.set
  }
}
