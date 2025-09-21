import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { applyDataModel, Res } from '../models/apply-data.model';
import {
  base64urlToUint8array,
  initialCheckStatus,
  uint8arrayToBase64url,
} from '../shared/utils/webauthn.utils';

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

  /**
   * @POST - Start FIDO registration process
   */
  postRegister(username: string, display: string): Observable<any> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('display', display);
    return this.httpClient.post<any>(this.REGISTER, formData);
  }

  /**
   * @POST - Complete FIDO registration
   */
  finishAuth(formData: FormData): Observable<any> {
    return this.httpClient.post<any>(this.FINISH_AUTH, formData);
  }

  /**
   * Complete FIDO registration flow
   */
  async completeFidoRegistration(username: string, display: string): Promise<any> {
    try {
      // Step 1: Start registration
      const formData = new FormData();
      formData.append('username', username);
      formData.append('display', display);

      const response = await fetch(this.REGISTER, {
        method: 'POST',
        body: formData,
      });

      const credentialCreateJson = await initialCheckStatus(response);

      // Step 2: Transform credential creation options
      const credentialCreateOptions = {
        publicKey: {
          ...credentialCreateJson.publicKey,
          challenge: base64urlToUint8array(credentialCreateJson.publicKey.challenge),
          user: {
            ...credentialCreateJson.publicKey.user,
            id: base64urlToUint8array(credentialCreateJson.publicKey.user.id),
          },
          excludeCredentials:
            credentialCreateJson.publicKey.excludeCredentials?.map((credential: any) => ({
              ...credential,
              id: base64urlToUint8array(credential.id),
            })) || [],
          extensions: credentialCreateJson.publicKey.extensions,
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
          attestationObject: uint8arrayToBase64url(
            new Uint8Array(publicKeyCredentialResponse.attestationObject)
          ),
          clientDataJSON: uint8arrayToBase64url(
            new Uint8Array(publicKeyCredentialResponse.clientDataJSON)
          ),
          transports: publicKeyCredentialResponse.getTransports
            ? publicKeyCredentialResponse.getTransports()
            : [],
        },
        clientExtensionResults: publicKeyCredential.getClientExtensionResults(),
      };
      // Step 5: Complete registration
      const finalFormData = new FormData();
      finalFormData.append('username', username);
      finalFormData.append('display', display);
      finalFormData.append('credential', JSON.stringify(encodedResult));

      const finalResponse = await fetch(this.FINISH_AUTH, {
        method: 'POST',
        body: finalFormData,
      });

      if (!finalResponse.ok) {
        throw new Error(`Registration failed: ${finalResponse.statusText}`);
      }

      return await finalResponse.json();
    } catch (error) {
      console.error('FIDO registration error:', error);
      throw error;
    }
  }

  private get REGISTER() {
    return `${this.prefixPath}/register`;
  }

  private get FINISH_AUTH() {
    return `${this.prefixPath}/finishauth`;
  }
}
