import { TestBed } from '@angular/core/testing';
import { LocaleService } from './locale.service';

describe('LocaleService', () => {
  let localeService: LocaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    localeService = TestBed.inject(LocaleService);
  });

  it('should be created', () => {
    expect(localeService).toBeTruthy();
  });

  it('should get the current locale', () => {
    expect(localeService.getCurrentLocale()).toEqual('fr-FR');
  });

  it('should set the current locale', () => {
    localeService.setCurrentLocale('en-US');
    expect(localeService.getCurrentLocale()).toEqual('en-US');
  });
});
