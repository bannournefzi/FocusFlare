import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourstrackComponent } from './hourstrack.component';

describe('HourstrackComponent', () => {
  let component: HourstrackComponent;
  let fixture: ComponentFixture<HourstrackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HourstrackComponent]
    });
    fixture = TestBed.createComponent(HourstrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
