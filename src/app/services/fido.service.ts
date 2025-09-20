import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { applyDataModel } from '../models/apply-data.model';
import { ApiFidoService } from './api-fido.service';

@Injectable({
  providedIn: 'root',
})
export class FidoService {
  private cache: {
    travelApplyData?: applyDataModel;
  } = {};

  constructor(private api: ApiFidoService) {}

  /**
   * @GET 執行register
   */
  getRegister(): Observable<applyDataModel> {
    if (this.cache.travelApplyData) {
      return of(this.cache.travelApplyData);
    }
    return this.api.getRegister().pipe(
      this.not200ThrowError(),
      map((res) => res.data),
      tap((data) => (this.cache.travelApplyData = data))
    );
  }

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
