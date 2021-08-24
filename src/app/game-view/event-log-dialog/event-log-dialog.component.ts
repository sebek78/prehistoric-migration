import { Component, Input, OnInit } from '@angular/core';
import { EventLog } from 'src/app/core/engine/events.service';

@Component({
  selector: 'app-event-log-dialog',
  templateUrl: './event-log-dialog.component.html',
  styleUrls: ['./event-log-dialog.component.scss'],
})
export class EventLogDialogComponent implements OnInit {
  @Input() eventLog: EventLog | undefined;

  constructor() {}

  ngOnInit(): void {}
}
