import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalandarComponent } from './calandar.component';

describe('CalandarComponent', () => {
  let component: CalandarComponent;
  let fixture: ComponentFixture<CalandarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalandarComponent]
    });
    fixture = TestBed.createComponent(CalandarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
