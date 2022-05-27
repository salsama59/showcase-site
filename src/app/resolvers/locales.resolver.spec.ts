import { TestBed } from '@angular/core/testing';

import { LocalesResolver } from './locales.resolver';

describe('LocalesResolver', () => {
  let resolver: LocalesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(LocalesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
