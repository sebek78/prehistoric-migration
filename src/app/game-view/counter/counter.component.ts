import { Component, OnInit, Input } from '@angular/core';
import { TribesService } from 'src/app/core/tribes.service';
import  { IBand } from '../../core/bands.service'

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  @Input() counter: IBand;

  constructor(
    private tribesService: TribesService
  ) {}

  color: string;

  ngOnInit(): void {
    this.color = this.tribesService.getTribeColor(this.counter.ownerId)
  }
}
