import { Injectable } from '@angular/core';
import { Log, logTypes } from './log'

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private logs: Log[] = []
  private lastLogId: number = 0

  constructor() {
    this.logs.push(new Log(logTypes.new))
  }

  setSavedLogs(logs: Log[]){
    this.logs = logs
    this.lastLogId = logs[logs.length - 1].id || 0
  }

  addLog(type: string, turn: number, text: string): void {
    const newLog = new Log(type, this.lastLogId + 1, turn, text);
    this.lastLogId += 1;
    this.logs.push(newLog)
  }

  getLogs(): Log[] {
    return this.logs
  }

  getLastLogs() {
    const lastTurn = this.logs[this.logs.length - 1].turn
    return this.logs.filter(log => log.turn === lastTurn)
  }

  getLog(id: number): Log{
    const log = this.logs.filter(log=> log.id === id)[0]
    if (log) return log
      else
    return new Log(logTypes.invalid,id)
  }
}
