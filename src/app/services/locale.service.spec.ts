import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Locale } from '../models/locales.model';
import { LocaleService } from './locale.service';

describe('LocaleService', () => {
  let localeService: LocaleService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    const expectedLocales: Observable<Locale[]> = of([
      new Locale('qds456qs4d54sq', 'fr-FR', 'Français'),
      new Locale('sq78d987qs4c4<98w51', 'en-US', 'Anglais')
    ]);
    httpClientSpy.get.and.returnValue(expectedLocales);
    TestBed.configureTestingModule({ providers: [
      { provide: HttpClient, useValue: httpClientSpy }
    ]});
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

  it('should get the current languageLabel', () => {
    expect(localeService.getCurrentLanguageLabel()).toEqual('Français');
  });

  it('should set the current language label', () => {
    localeService.setCurrentLanguageLabel('Anglais');
    expect(localeService.getCurrentLanguageLabel()).toEqual('Anglais');
  });

  it('should load the locales from backend', (done: DoneFn) => {
    const expectedLocales: Observable<Locale[]> = of([
      new Locale('qds456qs4d54sq', 'fr-FR', 'Français'),
      new Locale('sq78d987qs4c4<98w51', 'en-US', 'Anglais')
    ]);
    httpClientSpy.get.and.returnValue(expectedLocales);

    localeService.loadLocales().subscribe(isLoaded => {
      expect(isLoaded).toBeTrue();
      expect(localeService.getLocales()[0].localeCode).toEqual('fr-FR');
      expect(localeService.getLocales()[1].localeCode).toEqual('en-US');
      done();
    });
  });

  it('should load the locales from backend then from memory', (done: DoneFn) => {
    const expectedLocales: Observable<Locale[]> = of([
      new Locale('qds456qs4d54sq', 'fr-FR', 'Français'),
      new Locale('sq78d987qs4c4<98w51', 'en-US', 'Anglais')
    ]);
    httpClientSpy.get.and.returnValue(expectedLocales);

    localeService.loadLocales().subscribe(isLoaded => {
      expect(isLoaded).toBeTrue();
      expect(localeService.getLocales()[0].localeCode).toEqual('fr-FR');
      expect(localeService.getLocales()[1].localeCode).toEqual('en-US');
      localeService.loadLocales().subscribe(isLoadedSecondTime => {
        done();
        expect(isLoadedSecondTime).toBeTrue();
      });
    });
  });

});
