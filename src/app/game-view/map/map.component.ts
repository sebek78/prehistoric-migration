import { Component, OnInit, Input } from '@angular/core';
import { IField, MapService } from '../../core/map.service';
import { BandsService } from '../../core/bands.service';
import { EngineService } from 'src/app/core/engine/engine.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  constructor(
    private mapService: MapService,
    private bandService: BandsService,
    private engineService: EngineService
  ) {}

  waterClassStyle = 'field-water';
  fields = this.mapService.fields;
  bands = this.bandService.bands;

  ngOnInit(): void {}

  checkBands(x: number, y: number) {
    return this.bandService.getBandsByPosition(x, y);
  }

  selectTribe(field: IField) {
    this.engineService.setSelectedField(field);
  }
}
