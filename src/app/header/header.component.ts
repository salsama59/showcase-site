import { Component } from '@angular/core';
import { HeaderTranslationsConstants } from '../constants/header-translations-constants';
import { RouteConstants } from '../constants/route-constants';
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
   * @public
   * @constructor
   */
  constructor(public translationsService: TranslationsService) { }
}
