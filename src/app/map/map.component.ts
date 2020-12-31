import { Component, OnInit, Input } from '@angular/core';
import { IField } from '../core/map.service'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() fields: Array<IField>;

  constructor() { }

  waterClassStyle = "field-water";

  ngOnInit(): void {
    // console.log(this.fields)
  }

}

