import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiologistComponent } from './radiologist.component';

describe('RadiologistComponent', () => {
  let component: RadiologistComponent;
  let fixture: ComponentFixture<RadiologistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadiologistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiologistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
