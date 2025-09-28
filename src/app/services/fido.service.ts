import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FinishAuthReqModel, RegisterReqModel } from '../models/api-models/fido-req-model';
import {
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
  finishAuth(param: FinishAuthReqModel): Observable<Res<FinishRegistrationResponse>> {
    return this.api.finishAuth(param);
  }

  // /**
  //  * @GET 執行register
  //  */
  // getRegister(): Observable<applyDataModel> {
  //   if (this.cache.travelApplyData) {
  //     return of(this.cache.travelApplyData);
  //   }
  //   return this.api.getRegister().pipe(
  //     this.not200ThrowError(),
  //     map((res) => res.data),
  //     tap((data) => (this.cache.travelApplyData = data))
  //   );
  // }

  private not200ThrowError() {
    return (source: Observable<any>) =>
      source.pipe(
        map((response) => {
          if (response.status !== 200) {
            throw new Error(`API Error: ${response.message}`);
          }
          return response;
        })
      );
  }
}
