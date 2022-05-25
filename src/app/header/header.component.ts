import { Component } from '@angular/core';
import { HeaderTranslationsConstants } from '../constants/header-translations-constants';
import { RouteConstants } from '../constants/route-constants';
import { LocaleService } from '../services/locale.service';
import { TranslationsService } from '../services/translations.service';

/**
 * Header component class managing the header element behaviour
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {


  /**
   * Route constants of header component
   */
  public routeConstants = RouteConstants;

  /**
   * Header translations constants of header component
   */
  public headerTranslationsConstants = HeaderTranslationsConstants;


  /**
   * User language choice of header component
   */
  public userLanguageChoice: string = 'fr-FR';

  /**
   * Creates an instance of header component.
   * @param translationsService the translation service
   * @param localeService the locale service
   * @public
   * @constructor
   */
  constructor(public translationsService: TranslationsService, private localeService: LocaleService) { }


  /**
   * Determine what happen when the language dropdown value change.
   * Update the current locale then load the translations for the new locale.
   */
  onLanguageSwitch(): void {
    this.localeService.setCurrentLocale(this.userLanguageChoice);
    this.translationsService.loadTranslationsByLocale().subscribe();
  }
}
