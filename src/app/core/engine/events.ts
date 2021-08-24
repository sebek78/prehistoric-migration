import { AdvanceTypes } from '../advances/initAdvancesList';

export enum EventTypes {
  Disaster = 'Katastrofa',
  Migration = 'Migracja',
  Progress = 'Postęp',
  Expansion = 'Ekspansja',
  NoEvent = 'Brak wydarzenia',
}

export interface IEvent {
  eventType: EventTypes;
  label: string;
  skill: AdvanceTypes;
}

export const noEvent: IEvent = {
  eventType: EventTypes.NoEvent,
  label: '',
  skill: AdvanceTypes.Art,
};

export const eventsTable = [
  {
    label: 'Głód',
    eventType: EventTypes.Disaster,
    skill: AdvanceTypes.Gathering,
  },
  {
    label: 'Choroba',
    eventType: EventTypes.Disaster,
    skill: AdvanceTypes.Health,
  },
  {
    label: 'Wędrujące stada',
    eventType: EventTypes.Migration,
    skill: AdvanceTypes.Hunting,
  },
  {
    label: 'Udoskonalenie technologii',
    eventType: EventTypes.Progress,
    skill: AdvanceTypes.Tools,
  },
  {
    label: 'Epoka lodowcowa',
    eventType: EventTypes.Disaster,
    skill: AdvanceTypes.Fire,
  },
  {
    label: 'Epoka lodowcowa',
    eventType: EventTypes.Disaster,
    skill: AdvanceTypes.Shelter,
  },
  {
    label: 'Epoka lodowcowa',
    eventType: EventTypes.Disaster,
    skill: AdvanceTypes.Clothing,
  },
  {
    label: 'Zanik zwierząt',
    eventType: EventTypes.Disaster,
    skill: AdvanceTypes.Prey,
  },
  {
    label: 'Nowe Łowiska',
    eventType: EventTypes.Migration,
    skill: AdvanceTypes.Fishing,
  },
  {
    label: 'Współpraca',
    eventType: EventTypes.Expansion,
    skill: AdvanceTypes.Religion,
  },
  {
    label: 'Rewolucyjne idee',
    eventType: EventTypes.Progress,
    skill: AdvanceTypes.Art,
  },
];
