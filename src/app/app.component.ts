import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './core/local-storage.service';

export interface ITribeLabel {
  name: string;
  color: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ) {}
  path: string | undefined;

  ngOnInit() {
    this.path = document.location.pathname;
    this.localStorage.loadGame();
    this.router.navigate([this.path]);
  }
}
