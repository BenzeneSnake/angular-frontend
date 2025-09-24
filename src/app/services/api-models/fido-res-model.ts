/** 憑證建立回應 */
export interface CredentialCreateResponse {
  publicKey: PublicKey;
}
/**
 * 以下是根據後端引用Yubico lib的資料結構定義
 * 部分欄位因為TypeScript 內建的 lib.dom.d.ts 有放了 W3C 規範裡寫死的 WebAuthn 接口型別，就直接引用TypeScript的
 */
export interface PublicKey {
  /** Relying Party */
  rp: RelyingPartyIdentity;
  /** 使用者 */
  user: UserIdentity;
  /** 簽章*/
  challenge: string;
  /** 支援哪些公鑰類型和演算法選項 */
  pubKeyCredParams: PublicKeyCredentialParameters[];
  /** 限制挑戰有效時間 */
  timeout?: number;
  /** 避免重複註冊或辨識使用者現有裝置清單 */
  excludeCredentials?: PublicKeyCredentialDescriptor[];
  /** authenticator選項 */
  authenticatorSelection?: AuthenticatorSelectionCriteria;
  /**證明金鑰來源的簽章類型 */
  attestation: AttestationConveyancePreference;
  /** 註冊擴充功能 */
  extensions: RegistrationExtensionInputs;
}

export interface RelyingPartyIdentity {
  name: string;
  id: string;
}

export interface user {
  user: UserIdentity;
}

export interface UserIdentity {
  id: string; // base64url
  name: string;
  displayName: string;
}

export interface RegistrationExtensionInputs {
  /** AppID 排除清單 */
  appidExclude: AppId;
  /** 詢問 Authenticator 是否支援一些 credential 屬性 */
  credProps: boolean;
  // LargeBlob 是內部型別，後端在用，前端不用定義或可留空
  /** 是否要求回傳使用者驗證方式 */
  uvm: boolean;
}

export interface AppId {
  appid: string;
}
