import { Component, OnInit } from '@angular/core';
import { GameService, WinningCondition } from '../core/game.service'
import { MapService, IField} from '../core/map.service'

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss']
})
export class GameViewComponent implements OnInit {

  public fields: IField[] = [];
  public winningConditions: WinningCondition[][] = [];
  public turn: number;

  constructor(
    private gameService: GameService,
    private mapService: MapService
  ) { }

  ngOnInit(): void {
    this.fields = this.mapService.fields
    this.winningConditions = this.gameService.winningConditions
    this.turn = this.gameService.getTurn()
  }
}
