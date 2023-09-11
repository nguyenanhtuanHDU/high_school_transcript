import { TestBed } from '@angular/core/testing';

import { GadingService } from './gading.service';

describe('GadingService', () => {
  let service: GadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
