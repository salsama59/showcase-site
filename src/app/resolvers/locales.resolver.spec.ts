import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Locale } from '../models/locales.model';
import { LocaleService } from '../services/locale.service';
import { LocalesResolver } from './locales.resolver';

describe('LocalesResolver', () => {
  let resolver: LocalesResolver;
  let localeService: LocaleService;

  beforeEach(() => {
    let httpClientSpy: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['get']);
    const expectedLocales: Observable<Locale[]> = of([
      new Locale('qds456qs4d54sq', 'fr-FR', 'Français'),
      new Locale('sq78d987qs4c4<98w51', 'en-US', 'Anglais')
    ]);
    httpClientSpy.get.and.returnValue(expectedLocales);
    TestBed.configureTestingModule({ providers: [
      { provide: HttpClient, useValue: httpClientSpy }
    ] });
    localeService = TestBed.inject(LocaleService);
    resolver = TestBed.inject(LocalesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should resolve the loclales', () => {
    resolver.resolve().subscribe(isResolved => {
      expect(isResolved).toBeTrue();
      expect(localeService.getLocales()).toHaveSize(2);
    })
  });
});
