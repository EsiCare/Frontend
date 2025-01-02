import { TestBed } from '@angular/core/testing';

import { RecpService } from './recp.service';

describe('RecpService', () => {
  let service: RecpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
