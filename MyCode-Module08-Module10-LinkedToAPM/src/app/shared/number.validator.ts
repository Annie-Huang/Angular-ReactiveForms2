import { AbstractControl, ValidatorFn } from '@angular/forms';

export class NumberValidators {

  // Good to make it static so it won't create again and again.
  static range(min: number, max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.value && (isNaN(c.value) || c.value < min || c.value > max)) {
        return { 'range': true };
      }
      return null;
    };
  }
}
