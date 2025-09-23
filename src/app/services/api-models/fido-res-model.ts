/** 憑證建立回應 */
export interface CredentialCreateResponse {
  publicKey: PublicKey;
  //TODO: 其他欄位補齊
  //  publicKey: {
  //     rp: RelyingPartyIdentity;           // @NonNull
  //     user: UserIdentity;                 // @NonNull
  //     challenge: string;                  // @NonNull ByteArray (轉為 base64url)
  //     pubKeyCredParams: PublicKeyCredentialParameters[]; // @NonNull List
  //     timeout?: number;                   // Long (可選)
  //     excludeCredentials?: PublicKeyCredentialDescriptor[]; // Set (可選)
  //     authenticatorSelection?: AuthenticatorSelectionCriteria; // 可選
  //     attestation: AttestationConveyancePreference; // @NonNull
  //     extensions: RegistrationExtensionInputs; // @NonNull
  //   }
}

export interface PublicKey {
  rp: RelyingPartyIdentity;
}

export interface RelyingPartyIdentity {
  name: string;
  id: string;
}
