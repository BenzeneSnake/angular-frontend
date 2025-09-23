import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterReqModel } from 'src/app/services/api-models/fido-req-model';
import { BasePageComponent } from 'src/app/shared/base/base-page';
import { ApiFidoService } from '../../services/api-fido.service';
import { FidoService } from '../../services/fido.service';

@Component({
  selector: 'lib-app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends BasePageComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  loading = false;
  errorMsg = '';
  currentForm: 'login' | 'register' | 'forgot' = 'login';
  constructor(
    private fb: FormBuilder,
    private fidoSvc: FidoService,
    private apiFidoSvc: ApiFidoService
    // private authService: AuthService
  ) {
    super();
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      display: ['', Validators.required],
      // password: ['', Validators.required],//FIDO註冊，暫不需要密碼
      confirmPassword: ['', Validators.required],
    });
  }

  async onInit(): Promise<void> {}

  // async goNextStep(): Promise<void> {
  //   await this.fidoSvc.getRegister().toPromise();
  // }

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

  /**
   * 註冊表單提交 - FIDO WebAuthn 流程
   *
   * @returns
   */
  async onRegisterSubmit(): Promise<void> {
    if (this.registerForm.invalid) return;

    this.loading = true;
    this.errorMsg = '';

    try {
      const registerForm: RegisterReqModel = this.registerForm.getRawValue();

      // 使用完整的 FIDO 註冊流程
      const result = await this.completeFidoRegistration(registerForm);

      console.log('FIDO 註冊成功:', result);
      this.loading = false;

      // 註冊成功後返回登入頁面
      this.showLogin();
    } catch (error: any) {
      this.loading = false;
      console.error('FIDO 註冊錯誤:', error);

      // 根據錯誤類型顯示不同訊息
      if (error.name === 'NotSupportedError') {
        this.errorMsg = '您的瀏覽器不支援 FIDO 認證';
      } else if (error.name === 'InvalidStateError') {
        this.errorMsg = '此裝置已註冊過，請使用其他裝置或聯絡管理員';
      } else if (error.name === 'NotAllowedError') {
        this.errorMsg = '使用者取消了認證流程';
      } else {
        this.errorMsg = error.message || 'FIDO 註冊失敗，請稍後再試';
      }
    }
  }

  /**
   * Complete FIDO registration flow
   */
  async completeFidoRegistration(param: RegisterReqModel): Promise<any> {
    //   try {
    //     // Step 1: Start registration
    //     // const formData = new FormData();
    //     // formData.append('username', username);
    //     // formData.append('display', display);
    //     // const response = await fetch(this.REGISTER, {
    //     //   method: 'POST',
    //     //   body: param,
    //     // });
    //     const credentialCreateJson = await this.fidoSvc.registerUser(param).toPromise();
    //     // Step 2: Transform credential creation options
    //     const credentialCreateOptions = {
    //       publicKey: {
    //         ...credentialCreateJson.publicKey,
    //         challenge: WebauthnUtils.getInstance().base64urlToUint8array(
    //           credentialCreateJson.publicKey.challenge
    //         ),
    //         user: {
    //           ...credentialCreateJson.publicKey.user,
    //           id: WebauthnUtils.getInstance().base64urlToUint8array(
    //             credentialCreateJson.publicKey.user.id
    //           ),
    //         },
    //         excludeCredentials:
    //           credentialCreateJson.publicKey.excludeCredentials?.map((credential: any) => ({
    //             ...credential,
    //             id: WebauthnUtils.getInstance().base64urlToUint8array(credential.id),
    //           })) || [],
    //         extensions: credentialCreateJson.publicKey.extensions,
    //       },
    //     };
    //     // Step 3: Create credential using WebAuthn API
    //     const publicKeyCredential = (await navigator.credentials.create(
    //       credentialCreateOptions
    //     )) as PublicKeyCredential;
    //     if (!publicKeyCredential) {
    //       throw new Error('Failed to create credential');
    //     }
    //     // Step 4: Encode credential response
    //     const publicKeyCredentialResponse =
    //       publicKeyCredential.response as AuthenticatorAttestationResponse & {
    //         getTransports?: () => string[];
    //       };
    //     const encodedResult = {
    //       type: publicKeyCredential.type,
    //       id: publicKeyCredential.id,
    //       response: {
    //         attestationObject: WebauthnUtils.getInstance().uint8arrayToBase64url(
    //           new Uint8Array(publicKeyCredentialResponse.attestationObject)
    //         ),
    //         clientDataJSON: WebauthnUtils.getInstance().uint8arrayToBase64url(
    //           new Uint8Array(publicKeyCredentialResponse.clientDataJSON)
    //         ),
    //         transports: publicKeyCredentialResponse.getTransports
    //           ? publicKeyCredentialResponse.getTransports()
    //           : [],
    //       },
    //       clientExtensionResults: publicKeyCredential.getClientExtensionResults(),
    //     };
    //     // Step 5: Complete registration
    //     const finalFormData = new FormData();
    //     finalFormData.append('username', username);
    //     finalFormData.append('display', display);
    //     finalFormData.append('credential', JSON.stringify(encodedResult));
    //     const finalResponse = await fetch(this.FINISH_AUTH, {
    //       method: 'POST',
    //       body: finalFormData,
    //     });
    //     if (!finalResponse.ok) {
    //       throw new Error(`Registration failed: ${finalResponse.statusText}`);
    //     }
    //     return await finalResponse.json();
    //   } catch (error) {
    //     console.error('FIDO registration error:', error);
    //     throw error;
    //   }
  }
}
