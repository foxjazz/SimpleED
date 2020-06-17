import { TestBed } from '@angular/core/testing';

import { EDSDataService } from './edsdata.service';

describe('EDSDataService', () => {
  let service: EDSDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EDSDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
