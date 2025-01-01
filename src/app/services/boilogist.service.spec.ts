import { TestBed } from '@angular/core/testing';

import { BoilogistService } from './boilogist.service';

describe('BoilogistService', () => {
  let service: BoilogistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoilogistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
