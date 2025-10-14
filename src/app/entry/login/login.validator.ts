import { AbstractControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { errorHandle } from 'src/app/validators/error-handle';

export class LoginValidator {
  static validate(control: AbstractControl): ValidationErrors | null {
    const group = control as FormGroup;
    LoginValidator.usernameValidator(group);
    return null;
  }

  private static usernameValidator(group: FormGroup): void {
    const { username } = group.controls;
    const errors = Validators.required(username);
    if (errors) {
      errorHandle(username, (setError) => {
        setError(username, '未輸入username，請輸入username');
      });
    }
  }
}
