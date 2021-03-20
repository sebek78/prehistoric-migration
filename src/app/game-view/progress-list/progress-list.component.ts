import { Component, Input, OnInit } from '@angular/core';
import { WinningCondition } from 'src/app/core/game.service';

@Component({
  selector: 'app-progress-list',
  templateUrl: './progress-list.component.html',
  styleUrls: ['./progress-list.component.scss']
})
export class ProgressListComponent implements OnInit {
  @Input() winningCondition: WinningCondition[][]
  @Input() tribeNames: string[]

  public lastResult: WinningCondition[];
  public lastTurn: number;

  constructor() { }

  ngOnInit(): void {
    this.lastResult = this.winningCondition[this.winningCondition.length-1]
  }
}
