import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasePageComponent } from 'src/app/shared/base/base-page';
import { FidoService } from '../../services/fido.service';

@Component({
  selector: 'lib-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends BasePageComponent {
  loginForm: FormGroup;
  loading = false;
  errorMsg = '';
  currentForm: 'login' | 'register' | 'forgot' = 'login';
  constructor(
    private fb: FormBuilder,
    private fidoSvc: FidoService
    // private authService: AuthService
  ) {
    super();
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async onInit(): Promise<void> {}

  async goNextStep(): Promise<void> {
    await this.fidoSvc.getRegister().toPromise();
  }

  showForget(): void {
    this.currentForm = 'forgot';
  }

  showLogin(): void {
    this.currentForm = 'login';
  }

  showRegister(): void {
    this.currentForm = 'register';
  }

  onLoginSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorMsg = '';

    const { username, password } = this.loginForm.value;
    // this.authService.login(username, password).subscribe({
    //   next: (res) => {
    //     this.loading = false;
    //     console.log('登入成功:', res);
    //     // 可以導頁到 dashboard
    //   },
    //   error: (err) => {
    //     this.loading = false;
    //     this.errorMsg = '帳號或密碼錯誤';
    //   },
    // });
  }
}
