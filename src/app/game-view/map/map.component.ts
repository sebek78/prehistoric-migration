import { Component, OnInit, Input } from '@angular/core';
import { MapService} from '../../core/map.service'
import { BandsService } from '../../core/bands.service'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  constructor(
    private mapService: MapService,
    private bandService: BandsService,
  ) { }

  waterClassStyle = "field-water";
  fields = this.mapService.fields
  bands = this.bandService.bands;

  ngOnInit(): void {}

  checkBands(x:number, y:number){
    return this.bandService.getBandsByPosition(x,y);
  }
}

