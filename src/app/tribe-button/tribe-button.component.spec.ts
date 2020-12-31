import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TribeButtonComponent } from './tribe-button.component';

describe('TribeButtonComponent', () => {
  let component: TribeButtonComponent;
  let fixture: ComponentFixture<TribeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TribeButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TribeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
