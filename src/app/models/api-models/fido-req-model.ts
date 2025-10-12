export interface RegisterReqModel {
  username: string;
  display: string;
}

export interface FinishRegisterAuthReqModel {
  username: string;
  credname: string;
  credential: PublicKeyCredential;
}

export interface UsernameOnly {
  username: string;
}
export type LoginReqModel = UsernameOnly;

export interface DeleteUserReqModel {
  userId: number;
}

export interface FinishLoginAuthReqModel {
  username: string;
  credential: string;
}
