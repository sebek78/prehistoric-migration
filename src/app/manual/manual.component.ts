import { Component, OnInit } from '@angular/core';
import { GameService } from '../core/game.service'

@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.scss']
})
export class ManualComponent implements OnInit {

  constructor(
    private gameService: GameService,
  ) { }

  showReturnButton: boolean;

  ngOnInit(): void {
    this.showReturnButton = this.gameService.isRunning
  }
}
