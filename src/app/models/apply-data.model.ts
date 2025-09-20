export interface applyDataModel {
  id?: string;
}

export interface Res<T> {
  status: number;
  message: string;
  data: T;
}
