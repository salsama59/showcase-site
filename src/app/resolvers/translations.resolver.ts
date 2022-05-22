import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { TranslationsService } from '../services/translations.service';

/**
 * This class represent the translation resolver meant to load the translations when accessing a page
 */
@Injectable({
  providedIn: 'root'
})
export class TranslationsResolver implements Resolve<boolean> {
  /**
   * Creates an instance of translations resolver.
   * @param translationsService the translations service
   * @public
   * @constructor
   */
  constructor(private translationsService: TranslationsService){}

  /**
   * Resolves the translations by loading them from the backend
   * @returns an observable of boolean 
   */
  resolve(): Observable<boolean> {
    return this.translationsService.loadTranslationsByLocale();
  }
}