import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Res } from '../models/apply-data.model';
import { FinishAuthReqModel, RegisterReqModel } from './api-models/fido-req-model';
import { CredentialCreateResponse } from './api-models/fido-res-model';
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
  finishAuth(param: FinishAuthReqModel): Observable<Res<string>> {
    return this.httpClient.post<Res<string>>(this.FINISH_AUTH, param);
  }
}
