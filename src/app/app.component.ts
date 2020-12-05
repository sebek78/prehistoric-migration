import { Component } from '@angular/core';

export interface ITribeLabel {
  name: string,
  color: string,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'prehistoric-migration';
  defaultTribes = [
    {
      name: "Tygrysy",
      color: "#ff3300",
    },
    {
      name: "Niedźwiedzie",
      color: "#262626",
    },
    {
      name: "Wilki",
      color: "#737373",
    },
    {
      name: "Mamuty",
      color: "#4d2600",
    },
  ];
  /*
  const map = new Map();
  const tribes = new Tribes();
  const game = new GameStatus();
  const data = {
    game,
    tribes,
    map,
  };*/
  
}
