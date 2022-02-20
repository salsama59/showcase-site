import { Pipe, PipeTransform } from '@angular/core';

/**
 * A pipe that is responsible for converting a number n to an array with n elements
 */
@Pipe({
  name: 'numberToArray'
})
export class NumberToArrayPipe implements PipeTransform {

  /**
   * Transforms a number to array with n elements fiiled with 1
   * @param value the number
   * @returns an array with n elements 
   */
  transform(value: number): number[] {
    return (new Array(value)).fill(1);
  }

}
