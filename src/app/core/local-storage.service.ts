import { Injectable } from '@angular/core';

const SAVE_KEY = 'pm-save';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private savedGame: any;

  constructor() { }

  loadGame(){
    const savedGame: string | null = localStorage.getItem(SAVE_KEY);
    const gameData = savedGame ? JSON.parse(savedGame) : null;
    this.savedGame = gameData;
  }

  saveGame(data:string){
    localStorage.setItem(SAVE_KEY, data)
  }

  deleteSavedGame(){
    localStorage.removeItem(SAVE_KEY);
  }

  hasSavedGame(){
    return this.savedGame instanceof Object;
  }

  getGameServiceSavedData(){
    return this.savedGame?.game
  }

  getTribesServiceSavedData(){
    return this.savedGame?.tribes
  }

  getMapServiceSavedData(){
    return this.savedGame?.map
  }

  getBandsServiceSavedData() {
    return this.savedGame?.bands
  }
  getSavedLogs() {
    return this.savedGame?.logs
  }
}
