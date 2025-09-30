import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FinishLoginAuthReqModel,
  FinishRegisterAuthReqModel,
  LoginReqModel,
  RegisterReqModel,
} from '../models/api-models/fido-req-model';
import {
  AssertionResponse,
  CredentialCreateResponse,
  FinishRegistrationResponse,
} from '../models/api-models/fido-res-model';
import { Res } from '../models/common-models/res-model';
// import {
//   base64urlToUint8array,
//   initialCheckStatus,
//   uint8arrayToBase64url,
// } from '../shared/utils/webauthn.utils';

@Injectable({
  providedIn: 'root',
})
export class ApiFidoService {
  private prefixPath = '/api';
  // private channelId = 'default';

  constructor(private httpClient: HttpClient) {}

  // /**
  //  * @GET
  //  */
  // getRegister(): Observable<Res<applyDataModel>> {
  //   return this.httpClient.get<Res<applyDataModel>>(this.REGISTER);
  // }

  // /**
  //  * @POST - Start FIDO registration process
  //  */
  // postRegister(username: string, display: string): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('username', username);
  //   formData.append('display', display);
  //   return this.httpClient.post<any>(this.REGISTER, formData);
  // }

  // /**
  //  * @POST - Complete FIDO registration
  //  */
  // finishAuth(formData: FormData): Observable<any> {
  //   return this.httpClient.post<any>(this.FINISH_AUTH, formData);
  // }

  /**
   * @POST fido服務列表 - API1 註冊
   */
  private get REGISTER_USER() {
    return `${this.prefixPath}/register`;
  }

  /**
   * @POST fido服務列表 - API1 註冊
   */
  private get FINISH_AUTH() {
    return `${this.prefixPath}/finishauth`;
  }

  /**
   * @POST fido服務列表 - Login Start
   */
  private get LOGIN_START() {
    return `${this.prefixPath}/login`;
  }

  /**
   * @POST fido服務列表 - Login Finish
   */
  private get LOGIN_FINISH() {
    return `${this.prefixPath}/welcome`;
  }

  /**
   * @POST - fido服務列表 - API1 註冊
   *
   * 送出 register 請求給後端，並拿回 credential creation options
   */
  registerUser(param: RegisterReqModel): Observable<Res<CredentialCreateResponse>> {
    return this.httpClient.post<Res<CredentialCreateResponse>>(this.REGISTER_USER, param);
  }

  /**
   * @POST - fido服務列表 - API2 結束Auth
   *
   */
  finishAuth(param: FinishRegisterAuthReqModel): Observable<Res<FinishRegistrationResponse>> {
    return this.httpClient.post<Res<FinishRegistrationResponse>>(this.FINISH_AUTH, param);
  }

  /**
   * @POST - fido服務列表 - API3 登入開始
   *
   * 送出 login 請求給後端，獲取 assertion options
   */
  startLogin(param: LoginReqModel): Observable<Res<AssertionResponse>> {
    return this.httpClient.post<Res<AssertionResponse>>(this.LOGIN_START, param);
  }

  /**
   * @POST - fido服務列表 - API4 登入完成
   *
   * 完成登入驗證
   */
  finishLogin(param: FinishLoginAuthReqModel): Observable<any> {
    return this.httpClient.post<any>(this.LOGIN_FINISH, param);
  }
}
