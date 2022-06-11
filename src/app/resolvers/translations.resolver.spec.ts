import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { Translation } from '../models/translation.model';
import { TranslationsService } from '../services/translations.service';

import { TranslationsResolver } from './translations.resolver';

describe('TranslationsResolver', () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let translationsResolver: TranslationsResolver;
  let translationsService: TranslationsService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({imports: [HttpClientModule], providers: [
      { provide: HttpClient, useValue: httpClientSpy }
    ]});
    translationsResolver = TestBed.inject(TranslationsResolver);
    translationsService = TestBed.inject(TranslationsService);
    const expectedTranslations:  Observable<Translation[]> = of([
      new Translation('qf654q65s4f6', 'fr', 'my.fake.translation.key1', 'first value'),
      new Translation('er5eza4f5614', 'fr', 'my.fake.translation.key2', 'Second value')
    ]); 
    httpClientSpy.get.and.returnValue(expectedTranslations);
  });

  it('should be created', () => {
    expect(translationsResolver).toBeTruthy();
  });


  it('should resolve the translations', () => {
    expect(translationsService.get('my.fake.translation.key1')).not.toEqual('first value');
    translationsResolver.resolve().subscribe(isResolved => {
      expect(isResolved).toBeTrue();
      expect(translationsService.get('my.fake.translation.key1')).toEqual('first value');
    });
  });
});
