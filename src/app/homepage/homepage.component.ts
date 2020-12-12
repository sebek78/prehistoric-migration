import { Component, OnInit, Input } from '@angular/core';
import { TribesService } from '../tribes.service'
import { GameService } from '../game.service'
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

  defaultTribes = this.tribesService.getDefaultTribes();

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

  handleInputChange(i: number){
    this.selectedTribe = i;
  }

  handleStartGame(){
    this.showEntryDialog = false;
    this.gameService.isRunning = true;
    this.tribesService.createTribes();
    this.tribesService.setPlayer(this.selectedTribe)
  }
}
