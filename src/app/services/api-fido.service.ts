import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { applyDataModel, Res } from '../models/apply-data.model';

@Injectable({
  providedIn: 'root',
})
export class ApiFidoService {
  private prefixPath = '/api';
  // private channelId = 'default';

  constructor(private httpClient: HttpClient) {}

  /**
   * @GET
   */
  getRegister(): Observable<Res<applyDataModel>> {
    return this.httpClient.get<Res<applyDataModel>>(this.REGISTER);
  }

  private get REGISTER() {
    return `${this.prefixPath}/register`;
  }
}
