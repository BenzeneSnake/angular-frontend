export interface Res<T> {
  status: string;

  message: string;

  data: T;

  errorData?: unknown;

  time: string | null;

  success?: boolean;
}

export interface ErrorData {
  registerSuccess: boolean;
  message: string;
  username: string | null;
}
