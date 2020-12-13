import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service'
import { TribesService } from '../tribes.service' 
import { MapService} from '../map.service'

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss']
})
export class GameViewComponent implements OnInit {

  constructor(
    private gameService: GameService,
    private tribesService: TribesService,
    private mapService: MapService
  ) { }

  fields = this.mapService.fields

  ngOnInit(): void {
    console.log(this.gameService)
    console.log(this.tribesService)
    console.log(this.mapService)
  }
}
