import { AuthActionTypes, IAuthState } from "redux/type";
import {
  LOGIN_USER,
  REGISTER_USER,
  USER_ERROR,
  CLEAR_ERROR,
  GET_PROFILE,
} from "../types";

const defaultState = {
  user: null,
  authError: null,
  isAuthenticated: false,
};
export default (state: IAuthState = defaultState, action: AuthActionTypes) => {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        authError: null,
      };
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        authError: null,
      };
    case GET_PROFILE:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        authError: null,
      };
    case USER_ERROR:
      return {
        ...state,
        authError: action.payload,
        isAuthenticated: false,
        user: null,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      };
    default:
      return state;
  }
};
