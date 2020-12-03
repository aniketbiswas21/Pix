import {
  CLEAR_ERROR,
  GET_PROFILE,
  LOGIN_USER,
  REGISTER_USER,
  USER_ERROR,
  VERIFY_OTP,
} from "./types";

export interface RootState {
  auth: AuthRootState | null;
  otp: IOTPstate | null;
}
export interface AuthRootState {
  token?: string | null;
  refreshToken?: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  user: User | null;
  error?: any;
  authError: AuthError;
}
export interface AuthError {
  success: boolean;
  message: string;
}
export interface IAuthState {
  user: User | null;
  isAuthenticated: boolean;
  authError: any;
}

export interface IOTPstate {
  success: boolean | null;
  message: string | null;
  error: any;
}

export interface UserLoginForm {
  email: string;
  password: string;
}

export interface UserRegisterForm {
  name: string;
  email: string;
  password: string;
}

export interface User {
  name: string;
  photo: string;
  isGoogleUser: boolean;
  email: string;
  _id: string;
  id: string;
  verified: boolean;
}

export interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}

export interface RegisterUserAction {
  type: typeof REGISTER_USER;
  payload: AxiosResponse;
}

export interface LoginUserAction {
  type: typeof LOGIN_USER;
  payload: AxiosResponse;
}

export interface GetProfileAction {
  type: typeof GET_PROFILE;
  payload: AxiosResponse;
}

export interface UserErrorAction {
  type: typeof USER_ERROR;
  payload: AxiosResponse;
}

export interface ClearErrorAction {
  type: typeof CLEAR_ERROR;
}

export type AuthActionTypes =
  | RegisterUserAction
  | LoginUserAction
  | GetProfileAction
  | UserErrorAction
  | ClearErrorAction;

export interface VerifyOtpAction {
  type: typeof VERIFY_OTP;
  payload: AxiosResponse;
}

export interface OtpErrorAction {
  type: typeof OTP_ERROR;
  payload: AxiosResponse;
}

export interface ClearOTPErrorAction {
  type: typeof CLEAR_OTP_ERROR;
  payload?: AxiosResponse;
}

export type OTPActionTypes =
  | VerifyOtpAction
  | OtpErrorAction
  | ClearOTPErrorAction;
