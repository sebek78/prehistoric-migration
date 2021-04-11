import { Component,  OnInit } from '@angular/core';
import { LocalStorageService } from './core/local-storage.service';

export interface ITribeLabel {
  name: string,
  color: string,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    private localStorage: LocalStorageService
  ) {}
  path: string  | undefined;

  ngOnInit() {
    this.path = document.body.dataset.path;
    this.localStorage.loadGame()
  }
}
