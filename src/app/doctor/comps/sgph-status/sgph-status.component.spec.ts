import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SgphStatusComponent } from './sgph-status.component';

describe('SgphStatusComponent', () => {
  let component: SgphStatusComponent;
  let fixture: ComponentFixture<SgphStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SgphStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SgphStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
