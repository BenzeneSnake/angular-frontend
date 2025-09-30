export interface RegisterReqModel {
  username: string;
  display: string;
}

export interface FinishRegisterAuthReqModel {
  username: string;
  credname: string;
  credential: PublicKeyCredential;
}

export interface LoginReqModel {
  username: string;
}

export interface FinishLoginAuthReqModel {
  username: string;
  credential: string;
}
