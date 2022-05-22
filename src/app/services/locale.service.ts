import { Injectable } from '@angular/core';

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
}
