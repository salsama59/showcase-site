import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Translation } from '../models/translation.model';

import { TranslationsService } from './translations.service';

describe('TranslationsService', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let translationsService: TranslationsService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({imports: [HttpClientModule], providers: [
      { provide: HttpClient, useValue: httpClientSpy }
    ]});
    translationsService = TestBed.inject(TranslationsService);
  });

  it('should be created', () => {
    expect(translationsService).toBeTruthy();
  });

  it('should load the translations from backend', (done: DoneFn) => {
    const expectedTranslations:  Observable<Translation[]> = of([
      new Translation('qf654q65s4f6', 'fr', 'my.fake.translation.key1', 'first value'),
      new Translation('er5eza4f5614', 'fr', 'my.fake.translation.key2', 'Second value')
    ]); 
    httpClientSpy.get.and.returnValue(expectedTranslations);

    translationsService.loadTranslationsByLocale().subscribe(isLoaded => {
      expect(isLoaded).toBeTrue();
      expect(translationsService.get('my.fake.translation.key1')).toEqual('first value');
      expect(translationsService.get('my.fake.translation.key2')).toEqual('Second value');
      done();
    });
  });

  it('should get the translations by language code', (done: DoneFn) => {
    const expectedTranslations:  Observable<Translation[]> = of([
      new Translation('qf654q65s4f6', 'fr', 'my.fake.translation.key1', 'first value'),
      new Translation('er5eza4f5614', 'fr', 'my.fake.translation.key2', 'Second value')
    ]); 
    httpClientSpy.get.and.returnValue(expectedTranslations);

    translationsService.getTranslationsByLanguageCode('fr').subscribe(translations => {
      expect(translations.length).toEqual(2);
      expect(translations[0].translationValue).toEqual('first value');
      expect(translations[1].translationValue).toEqual('Second value');
      done();
    });
  });

  it('should load the translations from backend then from memory', (done: DoneFn) => {
    const expectedTranslations:  Observable<Translation[]> = of([
      new Translation('qf654q65s4f6', 'fr', 'my.fake.translation.key1', 'first value'),
      new Translation('er5eza4f5614', 'fr', 'my.fake.translation.key2', 'Second value')
    ]); 
    httpClientSpy.get.and.returnValue(expectedTranslations);

    translationsService.loadTranslationsByLocale().subscribe(isLoaded => {
      expect(isLoaded).toBeTrue();
      expect(translationsService.get('my.fake.translation.key1')).toEqual('first value');
      expect(translationsService.get('my.fake.translation.key2')).toEqual('Second value');
      translationsService.loadTranslationsByLocale().subscribe(isLoadedSecondTime => {
        done();
        expect(isLoaded).toBeTrue();
      });
    });
  });
});
