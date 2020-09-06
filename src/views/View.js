class View {
  constructor(model, controller) {
    this.mainMenu = document.getElementsByTagName("main-menu")[0];
    this.gameView = document.getElementsByTagName("game-view")[0];

    this.controller = controller;

    this.mainMenu.hidden = false;
    this.gameView.hidden = true;
  }

  showGameView() {
    this.mainMenu.hidden = true;
    this.gameView.hidden = false;
  }

  showMainMenu() {
    this.mainMenu.hidden = false;
    this.gameView.hidden = true;
  }

  // element.onClick = function() { this.fn() }
  // fn() {},
}

export default View;
