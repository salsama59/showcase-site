import { TestBed } from '@angular/core/testing';

import { EnumUtilsService } from './enum-utils.service';

describe('EnumUtilsService', () => {
  let service: EnumUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnumUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
