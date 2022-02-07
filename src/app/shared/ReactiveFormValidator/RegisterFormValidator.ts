import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { InputTextValidator } from './common/InputTextValidator';

export class RegisterFormValidator {
  static register = {
    accountValidator(ctrl: AbstractControl): ValidationErrors | null {
      const { pristine } = ctrl;

      if (pristine) {
        return null;
      }

      if (Validators.required(ctrl)) {
        return { errMsg: '帳號必填' };
      }

      const checkAccountRange = InputTextValidator.checkRange(3, 10);
      if (checkAccountRange(ctrl)) {
        return { errMsg: '帳號需介於3到10個字之間' };
      }

      return null;
    },

    passwordValidator(ctrl: AbstractControl): ValidationErrors | null {
      const { pristine } = ctrl;

      if (pristine) {
        return null;
      }

      if (Validators.required(ctrl)) {
        return { errMsg: '密碼必填' };
      }

      const checkPasswordRange = InputTextValidator.checkRange(8, 20);
      if (checkPasswordRange(ctrl)) {
        return { errMsg: '帳號需介於8到20個字之間' };
      }

      if (InputTextValidator.checkPassword(ctrl)) {
        return { errMsg: '密碼必須是英數混雜' };
      }

      return null;
    }
  };

  static recommender = {
    crossValidator(formGroup: FormGroup): ValidationErrors | null {
      const departmentVal = formGroup.get('recommenderDepartment')?.value;
      const idControl = formGroup.get('recommenderId');

      if (!idControl) {
        return null;
      }

      if (departmentVal) {
        if (Validators.required(idControl)) {
          idControl.setErrors({ errMsg: '推薦人代碼必填' });
          return null;
        }

        if (departmentVal === '1') {
          const prefixA = InputTextValidator.checkRegExp(/^A/);
          if (prefixA(idControl)) {
            idControl.setErrors({ errMsg: '客服部推薦人代碼開頭為A' });
            return null;
          }
        }

        if (departmentVal === '2') {
          const prefixB = InputTextValidator.checkRegExp(/^B/);
          if (prefixB(idControl)) {
            idControl.setErrors({ errMsg: '宣傳部推薦人代碼開頭為B' });
            return null;
          }
        }
      }
      return null;
    }
  };
}
