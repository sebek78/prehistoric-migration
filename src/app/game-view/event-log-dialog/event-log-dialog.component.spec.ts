import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventLogDialogComponent } from './event-log-dialog.component';

describe('EventLogDialogComponent', () => {
  let component: EventLogDialogComponent;
  let fixture: ComponentFixture<EventLogDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventLogDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventLogDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
