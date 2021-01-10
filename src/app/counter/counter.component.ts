import { Component, OnInit, Input } from '@angular/core';
import  { IBand } from '../core/bands.service'
import { Tribe } from '../core/tribe'

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  @Input() counter: IBand;

  constructor() {}

  color: string;

  ngOnInit(): void {
    this.color = Tribe.getTribeColor(this.counter.ownerId)
  }
}
