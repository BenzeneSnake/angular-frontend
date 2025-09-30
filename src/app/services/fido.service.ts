import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
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
import { ApiFidoService } from './api-fido.service';

@Injectable({
  providedIn: 'root',
})
export class FidoService {
  constructor(private api: ApiFidoService) {}

  /**
   * @POST 執行register
   */
  registerUser(param: RegisterReqModel): Observable<CredentialCreateResponse> {
    return this.api.registerUser(param).pipe(
      tap((res) => {
        console.log('registerUser response:', res);
      }),
      map((res) => res.data)
    );
  }

  /**
   * @POST 執行register
   */
  finishAuth(param: FinishRegisterAuthReqModel): Observable<Res<FinishRegistrationResponse>> {
    return this.api.finishAuth(param);
  }

  /**
   * @POST 執行login
   */
  startLogin(param: LoginReqModel): Observable<Res<AssertionResponse>> {
    return this.api.startLogin(param);
  }

  /**
   * @POST 執行login
   */
  finishLogin(param: FinishLoginAuthReqModel): Observable<any> {
    return this.api.finishLogin(param);
  }

  // private not200ThrowError() {
  //   return (source: Observable<any>) =>
  //     source.pipe(
  //       map((response) => {
  //         if (response.status !== 200) {
  //           throw new Error(`API Error: ${response.message}`);
  //         }
  //         return response;
  //       })
  //     );
  // }
}
