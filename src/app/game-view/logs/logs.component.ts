import { Component, OnInit } from '@angular/core';
import { Log } from 'src/app/core/engine/log';
import { LoggerService } from 'src/app/core/engine/logger.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  logs: Log[] = []

  constructor(
    private loggerService: LoggerService
  ) { }

  ngOnInit(): void {
    this.logs = this.loggerService.getLogs()
  }
}
