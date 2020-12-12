import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service'
import { TribesService } from '../tribes.service' 

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.scss']
})
export class GameViewComponent implements OnInit {

  constructor(
    private gameService: GameService,
    private tribesService: TribesService
  ) { }

  ngOnInit(): void {
    console.log(this.gameService)
    console.log(this.tribesService)
  }

}
