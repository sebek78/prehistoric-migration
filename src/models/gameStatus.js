export default class GameStatus {
  constructor() {
    this.isRunning = false;
    this.start = this.startGame;
  }

  startGame() {
    this.isRunning = true;
  }
}
