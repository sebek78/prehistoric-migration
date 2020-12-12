import { Component,  OnInit } from '@angular/core';

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
  constructor() {}
  path: string  | undefined;
  
  ngOnInit() {
    this.path = document.body.dataset.path;
    console.log(this.path);
  }
}
