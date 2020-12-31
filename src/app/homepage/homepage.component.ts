import { Component, OnInit, Input } from '@angular/core';
import { TribesService } from '../core/tribes.service'
import { GameService } from '../core/game.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  constructor( 
    private tribesService: TribesService,
    private gameService: GameService,
    private router: Router
  ){}
  ngOnInit(): void {}

  defaultTribes = this.tribesService.getTribes();
  showEntryDialog = false;
  innerText = this.gameService.isRunning ? "Kontynuuj" : "Nowa gra";
  selectedTribe = 0;

  toggleDialog(){
    if (!this.gameService.isRunning) {
      this.showEntryDialog = !this.showEntryDialog;
    } else {
      this.router.navigateByUrl('/game')
    }
  }
  handleClose(){
    this.toggleDialog();
  } 

  selectedInput(i: number){
    return this.selectedTribe === i;
  }

  handleStartGame(){
    this.showEntryDialog = false;
    this.gameService.isRunning = true;
    this.tribesService.setPlayer(this.selectedTribe)
  }
  onSelectTribe(i: number){
    this.selectedTribe = i;
  }
}
