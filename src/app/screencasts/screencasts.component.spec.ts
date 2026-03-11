import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreencastsComponent } from './screencasts.component';

describe('ScreencastsComponent', () => {
  let component: ScreencastsComponent;
  let fixture: ComponentFixture<ScreencastsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScreencastsComponent]
    });
    fixture = TestBed.createComponent(ScreencastsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
