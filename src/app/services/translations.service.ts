import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Translation } from '../models/translation.model';
import { map } from "rxjs/operators";
import { LocaleService } from './locale.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BackendEndpointConstants } from '../constants/backend-endpoint-constants';

/**
 * This class represent the translations service providing functions to load the translations from the backend.
 * Get a specific translation givent it's key. 
 */
@Injectable({
  providedIn: 'root'
})
export class TranslationsService {

  /**
   * Translation map of translations service
   * @private
   */
  private translationMap: Map<string, Map<string, string>>;

  /**
   * Creates an instance of translations service.
   * @param httpClient the http client
   * @param localeService the locale service
   */
  constructor(private httpClient: HttpClient, private localeService: LocaleService) { 
    this.translationMap = new Map<string, Map<string, string>>();
  }

  /**
   * Gets the translations by language code
   * @param languageCode the language code of the translations to get
   * @returns translations by language code 
   */
  getTranslationsByLanguageCode(languageCode: string): Observable<Translation[]>{
    const headers = new HttpHeaders()
    .set('Content-Type','application/json');
    return this.httpClient.get<Translation[]>(environment.showcaseBackendUrl + BackendEndpointConstants.TRANSLATIONS_ENDPOINT_URI + '/' + languageCode, {headers: headers})
  }

  /**
   * Loads translations by locale from the backend only if not already loaded in memory, otherwise do nothing
   * @returns an observable of boolean to indicate if the load was successfull.
   */
  loadTranslationsByLocale(): Observable<boolean>{
    const locale = this.localeService.getCurrentLocale();
    const headers = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('Accept-Language', locale);
    if(this.translationMap.has(locale)){
      return of(true);
    } else {
      return this.httpClient
      .get<Translation[]>(environment.showcaseBackendUrl + BackendEndpointConstants.TRANSLATIONS_ENDPOINT_URI + '/current-locale', {headers: headers})
      .pipe(map(translations => {
       translations.map(translation => {
         let currentTranslationMap: Map<string, string>;
         if(this.translationMap.has(locale)) {
           currentTranslationMap = <Map<string, string>>this.translationMap.get(locale);
         } else {
           currentTranslationMap = new Map<string, string>();
         }
         currentTranslationMap.set(translation.translationKey, translation.translationValue);
         this.translationMap.set(locale, currentTranslationMap);
       });
       return true;
     }));
    }
  }

  /**
   * Gets a specific translation value given a translation key
   * @param translationKey the translation key associated to the translation value
   * @returns the translation value if it exist otherwise return undefined 
   */
  public get(translationKey: string | undefined): string {
    return <string> this.translationMap.get(this.localeService.getCurrentLocale())?.get(<string>translationKey);
  }
}
