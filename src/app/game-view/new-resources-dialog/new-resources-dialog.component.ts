import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IResource } from 'src/app/core/engine/resources';
import { TribesService } from 'src/app/core/tribes.service';

@Component({
  selector: 'app-new-resources-dialog',
  templateUrl: './new-resources-dialog.component.html',
  styleUrls: ['./new-resources-dialog.component.scss']
})
export class NewResourcesDialogComponent implements OnChanges {
  @Input() open: boolean;
  @Input() setNewResources: ()=>void;
  @Input() getNextCard: (i: number) => void;
  @Input() rollAgain: number;

  public newCards: IResource[] = []

  constructor(
    private tribesService: TribesService
  ) {}

  ngOnChanges(changes: SimpleChanges){
    if (changes.open?.currentValue) {
      const tribe = this.tribesService.getHumanPlayerTribe()
      this.newCards = tribe?.newResources || []
    }
  }
}
