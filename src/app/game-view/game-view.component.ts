import { Component, OnInit } from '@angular/core';
import { EngineService } from '../core/engine/engine.service';
import { GameService, WinningCondition } from '../core/game.service'
import { MapService, IField} from '../core/map.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss']
})
export class GameViewComponent implements OnInit {

  public fields: IField[] = [];
  public winningConditions: WinningCondition[][] = [];
  public turn: number;
  openNewResourcesdDialog: boolean;
  subscription: Subscription;

  constructor(
    private gameService: GameService,
    private mapService: MapService,
    private engineService: EngineService
  ) { }

  ngOnInit(): void {
    this.fields = this.mapService.fields
    this.winningConditions = this.gameService.winningConditions
    this.turn = this.gameService.getTurn()
    this.subscription = this.engineService.newResourcesDialogStatus.subscribe(
      (isOpen: boolean) => this.openNewResourcesdDialog = isOpen
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleNextTurn(){
    this.gameService.nextTurn()
  }

  setNewResourcesDialogStatus(){
    this.engineService.closeNewResourcesDialog()
    this.engineService.phaseLoop()
  }
}
