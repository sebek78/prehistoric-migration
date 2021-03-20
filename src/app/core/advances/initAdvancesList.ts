export enum AdvanceTypes {
  Tools = 'Narzędzia',
  Hunting = 'Łowy',
  Fishing = 'Łowienie',
  Health = 'Zdrowie',
  Clothing = 'Ubrania',
  Fire= 'Ogień',
  Gathering = 'Zbieractwo',
  Religion = 'Religia',
  Shelter = 'Schronienie',
  Prey = 'Polowanie',
  Art = 'Sztuka'
}

interface InitAdvance {
  label: string,
  type: string,
}

export const initAdvancesList: InitAdvance[] = [
  { label: 'Zioła lecznicze', type: AdvanceTypes.Health },
  { label: 'Prymitywna chirurgia', type: AdvanceTypes.Health },
  { label: 'Położne', type: AdvanceTypes.Health },
  { label: 'Opatrywanie ran', type: AdvanceTypes.Health },
  { label: 'Składanie złamań', type: AdvanceTypes.Health },
  { label: 'Zielarz', type: AdvanceTypes.Health },
];
