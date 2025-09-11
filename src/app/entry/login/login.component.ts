import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'lib-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder
    // private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
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
