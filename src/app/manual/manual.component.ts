import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service'

@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.scss']
})
export class ManualComponent implements OnInit {

  constructor(
    private gameService: GameService,
  ) { }

  showResume: boolean;

  ngOnInit(): void {
    console.log(this.gameService)
    this.showResume = this.gameService.isRunning
  }

}
