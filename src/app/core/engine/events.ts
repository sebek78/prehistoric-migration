import { AdvanceTypes } from '../advances/initAdvancesList';

export enum EventTypes {
  Disaster = 'Katastrofa',
  Migration = 'Migracja',
  Progress = 'Postęp',
  Expansion = 'Ekspansja',
  NoEvent = 'Brak wydarzenia',
}

export interface IEvent {
  type: EventTypes;
  label: string;
  skill: AdvanceTypes;
}

export const noEvent: IEvent = {
  type: EventTypes.NoEvent,
  label: '',
  skill: AdvanceTypes.Art,
};

export const eventsTable = [
  {
    label: 'Głód',
    type: EventTypes.Disaster,
    skill: AdvanceTypes.Gathering,
  },
  {
    label: 'Choroba',
    type: EventTypes.Disaster,
    skill: AdvanceTypes.Health,
  },
  {
    label: 'Wędrujące stada',
    type: EventTypes.Migration,
    skill: AdvanceTypes.Hunting,
  },
  {
    label: 'Udoskonalenie technologii',
    type: EventTypes.Progress,
    skill: AdvanceTypes.Tools,
  },
  {
    label: 'Epoka lodowcowa',
    type: EventTypes.Disaster,
    skill: AdvanceTypes.Fire,
  },
  {
    label: 'Epoka lodowcowa',
    type: EventTypes.Disaster,
    skill: AdvanceTypes.Shelter,
  },
  {
    label: 'Epoka lodowcowa',
    type: EventTypes.Disaster,
    skill: AdvanceTypes.Clothing,
  },
  {
    label: 'Zanik zwierząt',
    type: EventTypes.Disaster,
    skill: AdvanceTypes.Prey,
  },
  {
    label: 'Nowe Łowiska',
    type: EventTypes.Migration,
    skill: AdvanceTypes.Fishing,
  },
  {
    label: 'Współpraca',
    type: EventTypes.Expansion,
    skill: AdvanceTypes.Religion,
  },
  {
    label: 'Rewolucyjne idee',
    type: EventTypes.Progress,
    skill: AdvanceTypes.Art,
  },
];
