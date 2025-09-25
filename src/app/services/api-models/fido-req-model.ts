export interface RegisterReqModel {
  username: string;
  display: string;
}

export interface FinishAuthReqModel {
  username: string;
  display: string;
  credential: string;
}
