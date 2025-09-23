import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { applyDataModel } from '../models/apply-data.model';
import { ApiFidoService } from './api-fido.service';
import { RegisterReqModel } from './api-models/fido-req-model';
import { CredentialCreateResponse } from './api-models/fido-res-model';

@Injectable({
  providedIn: 'root',
})
export class FidoService {
  private cache: {
    travelApplyData?: applyDataModel;
  } = {};

  constructor(private api: ApiFidoService) {}

  /**
   * @POST 執行register
   */
  registerUser(param: RegisterReqModel): Observable<CredentialCreateResponse> {
    return this.api.registerUser(param).pipe(map((res) => res.data));
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
