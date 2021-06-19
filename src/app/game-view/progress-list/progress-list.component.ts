import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EngineService } from 'src/app/core/engine/engine.service';
import { GameService, WinningCondition } from 'src/app/core/game.service';
import { TribesService } from 'src/app/core/tribes.service';

const START_YEAR = 30000;
const PERIOD = 500;

@Component({
  selector: 'app-progress-list',
  templateUrl: './progress-list.component.html',
  styleUrls: ['./progress-list.component.scss'],
})
export class ProgressListComponent implements OnInit {
  @Input() turn: number;

  public lastResult: WinningCondition[];
  public lastTurn: number;

  private newMoveSubscription: Subscription;
  private newAdvancesSubscription: Subscription;
  public winningConditions: WinningCondition[];

  constructor(
    private tribesService: TribesService,
    private engineService: EngineService,
    private gameService: GameService
  ) {}

  ngOnInit(): void {
    this.newMoveSubscription = this.engineService.newMoveMessage.subscribe(
      (newMove) => {
        if (newMove) {
          this.gameService.updateWinningConditions();
          this.winningConditions = this.gameService.getLastWinningCondition();
        }
      }
    );
    this.newAdvancesSubscription = this.engineService.newAdvances.subscribe(
      (newAdvances) => {
        if (newAdvances) {
          this.gameService.updateWinningConditions();
          this.winningConditions = this.gameService.getLastWinningCondition();
        }
      }
    );
    this.winningConditions = this.gameService.getLastWinningCondition();
  }

  ngOnDestroy(): void {
    this.newMoveSubscription.unsubscribe();
    this.newAdvancesSubscription.unsubscribe();
  }

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
