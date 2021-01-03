import { Component, OnInit, Input } from '@angular/core';
import  { IBand } from '../core/bands.service'
import { TribesService } from '../core/tribes.service'

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  @Input() counter: IBand;

  constructor(
    private tribeService: TribesService
  ) {}

  color: string;

  ngOnInit(): void {
    this.color = this.tribeService.getTribeColor(this.counter.ownerId)
  }
}
