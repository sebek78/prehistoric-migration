import { Component, Input, OnInit } from '@angular/core';
import { Tribe } from '../core/tribe'
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tribe-button',
  templateUrl: './tribe-button.component.html',
  styleUrls: ['./tribe-button.component.scss']
})
export class TribeButtonComponent implements OnInit {
  @Input() tribe: Tribe;
  @Input() i: number;
  @Input() checked: boolean;
  @Output() selectTribe = new EventEmitter();

  constructor() { }
  ngOnInit(): void {}
}
