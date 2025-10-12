import { AbstractControl } from '@angular/forms';

export const errorHandle = (
  ctrl: AbstractControl,
  checkErrors: (setError: (errMsg: string) => void) => void
): void => {
  // 先清除所有errors
  ctrl.setErrors(null);

  const errors: string[] = [];
  checkErrors((errMsg) => {
    errors.push(errMsg);
  });
  //設定驗證錯誤給這個欄位
  if (errors.length) {
    ctrl.setErrors({ errMsgs: errors });
  }
};
