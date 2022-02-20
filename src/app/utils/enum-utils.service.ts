import { Injectable } from '@angular/core';

/**
 * Service class providing utility methods to manage enums convertions 
 */
@Injectable({
  providedIn: 'root'
})
export class EnumUtilsService {

  /**
   * Creates an instance of enum utils service.
   * @public
   * @constructor
   */
  constructor() { }

  /**
   * Gets an enum  object properties length
   * @param enumType the enum type
   * @returns the enum object properties length 
   */
  getEnumLength(enumType: Object): number {
    return Object.keys(enumType).length / 2;
  }
}
