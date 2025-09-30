import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  FinishLoginAuthReqModel,
  FinishRegisterAuthReqModel,
  LoginReqModel,
  RegisterReqModel,
} from 'src/app/models/api-models/fido-req-model';
import { RegistrationExtensionInputs } from 'src/app/models/api-models/fido-res-model';
import { ErrorData } from 'src/app/models/common-models/res-model';
import { BasePageComponent } from 'src/app/shared/base/base-page';
import { WebauthnUtils } from 'src/app/shared/utils/webauthn.utils';
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
  finishRegisterAuthReq!: FinishRegisterAuthReqModel;
  finishLoginAuthReq!: FinishLoginAuthReqModel;
  constructor(
    private fb: FormBuilder,
    private fidoSvc: FidoService,
    private apiFidoSvc: ApiFidoService
    // private authService: AuthService
  ) {
    super();
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
    });
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      display: ['', Validators.required],
      // password: ['', Validators.required],//FIDO註冊，暫不需要密碼
      // confirmPassword: ['', Validators.required], //FIDO註冊，暫不需要密碼
    });
  }

  async onInit(): Promise<void> {}

  showForget(): void {
    this.currentForm = 'forgot';
  }

  showLogin(): void {
    this.currentForm = 'login';
  }

  showRegister(): void {
    this.currentForm = 'register';
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
  async completeFidoRegistration(param: RegisterReqModel): Promise<void> {
    try {
      const credentialCreateJson = await this.fidoSvc.registerUser(param).toPromise();

      // Step 2: Transform credential creation options
      const credentialCreateOptions = {
        publicKey: {
          rp: credentialCreateJson.publicKey.rp,
          user: {
            ...credentialCreateJson.publicKey.user,
            id: WebauthnUtils.getInstance().base64urlToUint8array(
              credentialCreateJson.publicKey.user.id
            ),
          },
          challenge: WebauthnUtils.getInstance().base64urlToUint8array(
            credentialCreateJson.publicKey.challenge
          ),
          pubKeyCredParams: credentialCreateJson.publicKey.pubKeyCredParams,
          timeout: credentialCreateJson.publicKey.timeout,
          excludeCredentials:
            credentialCreateJson.publicKey.excludeCredentials?.map((credential: any) => ({
              ...credential,
              id: WebauthnUtils.getInstance().base64urlToUint8array(credential.id),
            })) || [],
          authenticatorSelection: credentialCreateJson.publicKey.authenticatorSelection,
          attestation: credentialCreateJson.publicKey.attestation,
          extensions: this.buildExtensions(credentialCreateJson.publicKey.extensions),
        },
      };
      // Step 3: Create credential using WebAuthn API
      const publicKeyCredential = (await navigator.credentials.create(
        credentialCreateOptions
      )) as PublicKeyCredential;
      if (!publicKeyCredential) {
        throw new Error('Failed to create credential');
      }
      // Step 4: Encode credential response
      const publicKeyCredentialResponse =
        publicKeyCredential.response as AuthenticatorAttestationResponse & {
          getTransports?: () => string[];
        };
      const encodedResult = {
        type: publicKeyCredential.type,
        id: publicKeyCredential.id,
        response: {
          attestationObject: WebauthnUtils.getInstance().uint8arrayToBase64url(
            new Uint8Array(publicKeyCredentialResponse.attestationObject)
          ),
          clientDataJSON: WebauthnUtils.getInstance().uint8arrayToBase64url(
            new Uint8Array(publicKeyCredentialResponse.clientDataJSON)
          ),
          transports: publicKeyCredentialResponse.getTransports
            ? publicKeyCredentialResponse.getTransports()
            : [],
        },
        clientExtensionResults: publicKeyCredential.getClientExtensionResults(),
      };
      // Step 5: Complete registration
      this.finishRegisterAuthReq = {
        username: param.username,
        credname: param.display,
        credential: publicKeyCredential,
      };
      const finishauth = await this.fidoSvc.finishAuth(this.finishRegisterAuthReq).toPromise();
      switch (finishauth.status) {
        case '200':
          this.showLogin();
          break;
        default: {
          const err = finishauth.errorData as ErrorData;
          this.errorMsg = err.message;
          break;
        }
      }
    } catch (error) {
      console.error('FIDO registration error:', error);
      throw error;
    }
  }

  /**
   * 登入表單提交 - FIDO WebAuthn 流程
   *
   * @returns
   */
  async onLoginSubmit(): Promise<void> {
    if (this.registerForm.invalid) return;

    this.loading = true;
    this.errorMsg = '';

    try {
      const loginForm: LoginReqModel = this.loginForm.getRawValue();

      // 使用完整的 FIDO 註冊流程
      const result = await this.completeFidoLogin(loginForm);

      console.log('FIDO 註冊成功:', result);
      this.loading = false;
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

  async completeFidoLogin(param: LoginReqModel): Promise<void> {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.errorMsg = '';

    try {
      // Step 1: Start login process - get assertion options
      const assertionResponse = await this.fidoSvc.startLogin(param).toPromise();

      // Step 2: Transform assertion options for WebAuthn API
      const credentialGetOptions = {
        publicKey: {
          ...assertionResponse.data.publicKey,
          allowCredentials: assertionResponse.data.publicKey.allowCredentials
            ? assertionResponse.data.publicKey.allowCredentials.map((credential: any) => ({
                ...credential,
                id: WebauthnUtils.getInstance().base64urlToUint8array(credential.id),
              }))
            : [],
          challenge: WebauthnUtils.getInstance().base64urlToUint8array(
            assertionResponse.data.publicKey.challenge
          ),
          extensions: assertionResponse.data.publicKey.extensions || {},
        },
      };

      // Step 3: Get credential using WebAuthn API
      const publicKeyCredential = (await navigator.credentials.get(
        credentialGetOptions
      )) as PublicKeyCredential;

      if (!publicKeyCredential) {
        throw new Error('Failed to get credential');
      }

      // Step 4: Encode credential response
      const publicKeyCredentialResponse =
        publicKeyCredential.response as AuthenticatorAssertionResponse;

      const encodedResult = {
        type: publicKeyCredential.type,
        id: publicKeyCredential.id,
        response: {
          authenticatorData: WebauthnUtils.getInstance().uint8arrayToBase64url(
            new Uint8Array(publicKeyCredentialResponse.authenticatorData)
          ),
          clientDataJSON: WebauthnUtils.getInstance().uint8arrayToBase64url(
            new Uint8Array(publicKeyCredentialResponse.clientDataJSON)
          ),
          signature: WebauthnUtils.getInstance().uint8arrayToBase64url(
            new Uint8Array(publicKeyCredentialResponse.signature)
          ),
          userHandle: publicKeyCredentialResponse.userHandle
            ? WebauthnUtils.getInstance().uint8arrayToBase64url(
                new Uint8Array(publicKeyCredentialResponse.userHandle)
              )
            : null,
        },
        clientExtensionResults: publicKeyCredential.getClientExtensionResults(),
      };

      // Step 5: Complete registration
      this.finishLoginAuthReq = {
        username: param.username,
        credential: JSON.stringify(encodedResult),
      };
      //encodedResult物件轉成字串
      const loginResult = await this.fidoSvc.finishLogin(this.finishLoginAuthReq).toPromise();

      // if (loginResult.success) {
      //   console.log('Login successful:', loginResult);
      //   // Handle successful login - redirect or update UI
      //   // You can add navigation logic here
      // } else {
      //   this.errorMsg = loginResult.message || 'Login failed';
      // }

      this.loading = false;
    } catch (error: any) {
      this.loading = false;
      console.error('Login error:', error);

      // Handle different types of WebAuthn errors
      if (error.name === 'NotSupportedError') {
        this.errorMsg = '您的瀏覽器不支援 FIDO 認證';
      } else if (error.name === 'NotAllowedError') {
        this.errorMsg = '使用者取消了認證流程';
      } else if (error.name === 'SecurityError') {
        this.errorMsg = '安全性錯誤，請檢查網站設定';
      } else if (error.name === 'InvalidStateError') {
        this.errorMsg = '認證器狀態錯誤';
      } else {
        this.errorMsg = error.message || 'Login failed, please try again';
      }
    }
  }

  /**
   * Build WebAuthn extensions object, filtering out null values
   */
  private buildExtensions(
    extensions: RegistrationExtensionInputs
  ): AuthenticationExtensionsClientInputs {
    if (!extensions) return {};

    const cleanExtensions: AuthenticationExtensionsClientInputs = {};

    if (extensions.appidExclude !== null && extensions.appidExclude !== undefined) {
      cleanExtensions.appid = extensions.appidExclude;
    }
    if (extensions.credProps !== null && extensions.credProps !== undefined) {
      cleanExtensions.credProps = extensions.credProps;
    }
    return cleanExtensions;
  }
}
