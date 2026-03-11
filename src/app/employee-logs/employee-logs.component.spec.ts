import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLogsComponent } from './employee-logs.component';

describe('EmployeeLogsComponent', () => {
  let component: EmployeeLogsComponent;
  let fixture: ComponentFixture<EmployeeLogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeeLogsComponent]
    });
    fixture = TestBed.createComponent(EmployeeLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
