import {
  CLEAR_ERROR,
  GET_PROFILE,
  LOGIN_USER,
  REGISTER_USER,
  USER_ERROR,
} from "./types";

export interface IAuthState {
  user: User | null;
  isAuthenticated: boolean;
  authError: any;
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

export interface RegisterUserAction {
  type: typeof REGISTER_USER;
  payload: User;
}

export interface LoginUserAction {
  type: typeof LOGIN_USER;
  payload: User;
}

export interface GetProfileAction {
  type: typeof GET_PROFILE;
  payload: User;
}

export interface UserErrorAction {
  type: typeof USER_ERROR;
  payload: User;
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
