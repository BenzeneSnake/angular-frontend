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

  /**
   * @DELETE - 取消註冊（刪除用戶）
   *
   * 刪除 PENDING 或 COMPLETED 狀態的用戶
   * - PENDING 用戶：只刪除本地 DB
   * - COMPLETED 用戶：同時刪除 Keycloak 和本地 DB
   */
  deleteUser(userId: number): Observable<Res<string>> {
    return this.httpClient.delete<Res<string>>(this.DELETE_USER(userId.toString()));
  }

  /**
   * @DELETE - 取消註冊（刪除用戶）
   */
  private DELETE_USER(userId: string) {
    return `${this.prefixPath}/user/${userId}`;
  }
}
