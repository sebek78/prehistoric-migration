import { Component, OnInit } from '@angular/core';

interface Game {
  isRunning: boolean;
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  showEnrtyDialog = false;
  game: Game = {
    isRunning: false,
  };
  innerText = this.game.isRunning ? "Kontynuuj" : "Nowa gra"

  constructor() { }

  ngOnInit(): void {}

  toggleDialog(): void {
    if (!this.game.isRunning) {
      this.showEnrtyDialog = !this.showEnrtyDialog;
    } else {
      // navigate("/game", { replace: true });
      console.log('navigate to game');
    }
  }

}
