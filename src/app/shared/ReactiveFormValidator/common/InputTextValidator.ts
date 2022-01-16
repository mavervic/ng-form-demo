import { AbstractControl, ValidationErrors } from '@angular/forms';

export class InputTextValidator {
  static checkRange(min: number, max: number) {
    return (ctrl: AbstractControl): ValidationErrors | null => {
      const leng = ctrl?.value?.length;
      if (leng) {
        return leng < min || leng > max
          ? {
              outRange: true
            }
          : null;
      }

      return null;
    };
  }

  static checkPassword(ctrl: AbstractControl): ValidationErrors | null {
    const val = ctrl?.value;

    const reg = /[0-9]+/;
    const reg2 = /[a-zA-Z]+/;
    const reg3 = /[^0-9a-zA-Z]/;

    if (val) {
      return reg.test(val) && reg2.test(val) && !reg3.test(val)
        ? null
        : {
            simplePassWord: true
          };
    }

    return null;
  }

  static checkRegExp(reg: RegExp) {
    return (ctrl: AbstractControl): ValidationErrors | null => {
      const val = ctrl?.value;

      if (val) {
        return reg.test(val)
          ? null
          : {
              regExp: true
            };
      }

      return null;
    };
  }
}
