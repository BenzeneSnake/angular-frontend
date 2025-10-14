import { AbstractControl, ValidationErrors } from '@angular/forms';

type ShowFn = (isInvalid: ValidationErrors | boolean | null, errMsg: string) => void;

export const errorHandle = (
  ctrl: AbstractControl,
  checkErrors: (showCallBack: ShowFn) => void
): void => {
  // 先清除所有errors
  ctrl.setErrors(null);
  // 執行檢查，如Invalid就跳出檢查，並setError
  try {
    checkErrors((isInvalid, errMsg) => {
      if (isInvalid) {
        throw new Error(errMsg);
      }
    });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    ctrl.setErrors({ errMsg });
  }
};
