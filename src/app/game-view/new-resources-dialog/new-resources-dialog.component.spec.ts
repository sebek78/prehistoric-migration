import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewResourcesDialogComponent } from './new-resources-dialog.component';

describe('NewResourcesDialogComponent', () => {
  let component: NewResourcesDialogComponent;
  let fixture: ComponentFixture<NewResourcesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewResourcesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewResourcesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
