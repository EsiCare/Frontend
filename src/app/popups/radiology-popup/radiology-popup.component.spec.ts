import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiologyPopupComponent } from './radiology-popup.component';

describe('RadiologyPopupComponent', () => {
  let component: RadiologyPopupComponent;
  let fixture: ComponentFixture<RadiologyPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadiologyPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiologyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
