import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewPresComponent } from './preview-pres.component';

describe('PreviewPresComponent', () => {
  let component: PreviewPresComponent;
  let fixture: ComponentFixture<PreviewPresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewPresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewPresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
