import { Component, Input, OnInit } from '@angular/core';
import {ITribe } from '../core/tribes.service'
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tribe-button',
  templateUrl: './tribe-button.component.html',
  styleUrls: ['./tribe-button.component.scss']
})
export class TribeButtonComponent implements OnInit {
  @Input() tribe: ITribe;
  @Input() i: number;
  @Input() checked: boolean;
  @Output() selectTribe = new EventEmitter();

  constructor() { }
  ngOnInit(): void {}
}
