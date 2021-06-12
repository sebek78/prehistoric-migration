import { Component, Input, OnInit } from '@angular/core';
import { WinningCondition } from 'src/app/core/game.service';
import { TribesService } from 'src/app/core/tribes.service';

const START_YEAR = 30000;
const PERIOD = 500;

@Component({
  selector: 'app-progress-list',
  templateUrl: './progress-list.component.html',
  styleUrls: ['./progress-list.component.scss'],
})
export class ProgressListComponent implements OnInit {
  @Input() winningConditions: WinningCondition[];
  @Input() turn: number;

  public lastResult: WinningCondition[];
  public lastTurn: number;

  constructor(private tribesService: TribesService) {}

  ngOnInit(): void {}

  getTribeColor(id: number) {
    return this.tribesService.getTribeColor(id);
  }

  getTribeName(id: number) {
    return this.tribesService.getTribeName(id);
  }

  getControlledByPlayer(id: number) {
    return this.tribesService.getTribeControlledByPlayer(id);
  }

  getYear() {
    return START_YEAR - this.turn * PERIOD;
  }
}
