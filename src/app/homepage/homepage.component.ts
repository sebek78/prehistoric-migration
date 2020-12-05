import { Component, OnInit, Input } from '@angular/core';
import { ITribeLabel } from '../app.component'

interface Game {
  isRunning: boolean;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}

  @Input() defaultTribes: Array<ITribeLabel>;

  showEntryDialog = false;
  game: Game = {
    isRunning: false,
  };
  innerText = this.game.isRunning ? "Kontynuuj" : "Nowa gra";
  selectedTribe = 0;
  

  toggleDialog(){
    if (!this.game.isRunning) {
      this.showEntryDialog = !this.showEntryDialog;
    } else {
      console.log('/game');
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
    this.game.isRunning = true;
    this.showEntryDialog = false;
    console.log('/game, start game');
  }
}
