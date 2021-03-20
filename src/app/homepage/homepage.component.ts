import { Component, OnInit, Input } from '@angular/core';
import { TribesService } from '../core/tribes.service'
import { GameService } from '../core/game.service'
import { Router } from '@angular/router'
import { LocalStorageService } from '../core/local-storage.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  public hasSavedGame: boolean;
  public innerText: string;
  public defaultTribes = this.tribesService.getTribes();
  public showEntryDialog = false;
  private selectedTribe = 0;

  constructor(
    private tribesService: TribesService,
    private gameService: GameService,
    private localStorage: LocalStorageService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.hasSavedGame = this.localStorage.hasSavedGame()
    this.setInnerText()
  }

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
    this.gameService.startGame(this.selectedTribe);
  }
  onSelectTribe(i: number){
    this.selectedTribe = i;
  }

  setInnerText(){
    this.innerText = this.gameService.isRunning ? "Kontynuuj" : "Nowa gra";
  }
  deleteSavedGame(){
    this.gameService.stopGame();
    this.localStorage.deleteSavedGame()
    this.hasSavedGame = false;
    this.setInnerText()
  }
}
