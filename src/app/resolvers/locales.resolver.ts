import { Injectable } from '@angular/core';
import {Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocaleService } from '../services/locale.service';

/**
 * This class represent the locales resolver meant to load the loclales when accessing a page
 */
@Injectable({
  providedIn: 'root'
})
export class LocalesResolver implements Resolve<boolean> {

  /**
   * Creates an instance of locales resolver.
   * @param localeService the loclale service
   */
  constructor(private localeService: LocaleService){}

  /**
   * Resolves the loclales by loading them from the backend
   * @returns an observable of boolean 
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.localeService.loadLocales();
  }
}
