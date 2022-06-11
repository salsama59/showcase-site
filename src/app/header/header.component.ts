import { Component } from '@angular/core';
import { HeaderTranslationsConstants } from '../constants/header-translations-constants';
import { RouteConstants } from '../constants/route-constants';
import { Locale } from '../models/locales.model';
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
   * Creates an instance of header component.
   * @param translationsService the translation service
   * @param localeService the locale service
   * @public
   * @constructor
   */
  constructor(public translationsService: TranslationsService, public localeService: LocaleService) { }

  /**
   * Determine what happen when the language dropdown value change.
   * Update the current locale and the current language label then load the translations and the loclale list for the new locale.
   * @param chosenLocale the chosen locale
   * @param chosenLanguageLabel the chose language label
   */
  onLanguageSwitch(chosenLocale: string, chosenLanguageLabel: string): void {
    this.localeService.setCurrentLocale(chosenLocale);
    this.localeService.setCurrentLanguageLabel(chosenLanguageLabel)
    this.localeService.loadLocales().subscribe(_ => {
      const searchedLocale: Locale = <Locale>this.localeService.getLocales().find(locale => {return locale.localeCode === chosenLocale});
      this.localeService.setCurrentLanguageLabel(searchedLocale.languageLabel);
    });
    this.translationsService.loadTranslationsByLocale().subscribe();
  }
}
