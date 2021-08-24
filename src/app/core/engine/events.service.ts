import { Injectable } from '@angular/core';
import { IEvent } from '../engine/events';
import { IField } from '../map.service';

export interface EventLog {
  event: IEvent;
  fieldId: number;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  public playerEvents: EventLog[] = [];

  constructor() {}

  createEventLog(event: IEvent, field: IField, message: string) {
    const eventLog = {
      event,
      fieldId: field.id,
      message,
    };
    this.playerEvents.push(eventLog);
  }

  hasEventLog(fieldId: number) {
    const index = this.playerEvents.findIndex(
      (eventLog) => eventLog.fieldId === fieldId
    );
    return index !== -1;
  }

  getEventLog(fieldId: number) {
    return this.playerEvents.find((eventLog) => eventLog.fieldId === fieldId);
  }

  deleteEventLog(fieldId: number) {
    console.log(fieldId);
  }
}
