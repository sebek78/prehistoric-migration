import { Component, Input, OnInit } from '@angular/core';
import { WinningCondition } from 'src/app/core/game.service';
import { Tribe } from '../../core/tribe'

const START_YEAR = 30000;
const PERIOD = 500;

@Component({
  selector: 'app-progress-list',
  templateUrl: './progress-list.component.html',
  styleUrls: ['./progress-list.component.scss']
})
export class ProgressListComponent implements OnInit {
  @Input() winningCondition: WinningCondition[][]
  @Input() tribeNames: string[]
  @Input() turn: number;

  public lastResult: WinningCondition[];
  public lastTurn: number;

  constructor() { }

  ngOnInit(): void {
    this.lastResult = this.winningCondition[this.winningCondition.length-1]
  }

  getTribeColor(index: number) {
    return Tribe.getTribeColor(index)
  }
  getYear(){
    return START_YEAR - (this.turn * PERIOD);
  }
}
