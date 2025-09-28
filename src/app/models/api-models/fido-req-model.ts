export interface RegisterReqModel {
  username: string;
  display: string;
}

export interface FinishAuthReqModel {
  username: string;
  credname: string;
  credential: PublicKeyCredential;
}
