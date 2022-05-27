import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BackendEndpointConstants } from '../constants/backend-endpoint-constants';
import { Locale } from '../models/locales.model';

/**
 * This class represent the Locale service providing functions to set and get the current application locale
 */
@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  /**
   * Current locale of locale service
   * @private
   */
  private currentLocale: string = 'fr-FR';

  /**
   * Current language label of locale service
   * @private
   */
  private currentLanguageLabel: string = 'Français';


  /**
   * Locales map of locale service
   * @private
   */
   private localesMap: Map<string, Locale[]>;


  /**
   * Creates an instance of translations service.
   * @param httpClient the http client
   * @public
   * @constructor
   */
  constructor(private httpClient: HttpClient){
    this.localesMap = new Map<string, Locale[]>();
  }

  /**
   * Gets the current locale
   * @returns the current locale 
   * @public
   */
  public getCurrentLocale(): string {
    return this.currentLocale;
  }

  /**
   * Sets the current locale
   * @param newLocale the new local to be set
   * @public
   */
  public setCurrentLocale(newLocale: string): void {
    this.currentLocale = newLocale;
  }


  /**
   * Gets the current language label
   * @returns the current language label 
   * @public
   */
   public getCurrentLanguageLabel(): string {
    return this.currentLanguageLabel;
  }

  /**
   * Sets the current language label
   * @param newLanguageLabel the new language label to be set
   * @public
   */
  public setCurrentLanguageLabel(newLanguageLabel: string): void {
    this.currentLanguageLabel = newLanguageLabel;
  }

  /**
   * Load locales given the current client locale
   * @returns an observable of locales 
   */
  public loadLocales(): Observable<boolean> {
    const headers = new HttpHeaders()
    .set('Content-Type','application/json')
    .set('Accept-Language', this.getCurrentLocale());
    if(this.localesMap.has(this.getCurrentLocale())){
      return of(true);
    } else {
      return this.httpClient.get<Locale[]>(environment.showcaseBackendUrl + BackendEndpointConstants.LOCALES_ENDPOINT_URI, {headers: headers})
      .pipe(map(locales => {
        this.localesMap.set(this.getCurrentLocale(), locales);
        return true;
      }));
    }
  }

  /**
   * Get loclales saved in the memory
   * @returns a loclale list
   */
  public getLocales(): Locale[] {
    return <Locale[]>this.localesMap.get(this.getCurrentLocale());
  }
}
