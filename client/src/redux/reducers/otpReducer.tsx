import { IOTPstate, OTPActionTypes } from "redux/type";
import { VERIFY_OTP, OTP_ERROR, CLEAR_OTP_ERROR } from "../types";

const defaultState = {
  success: null,
  message: null,
  error: null,
};

export default (state: IOTPstate = defaultState, action: OTPActionTypes) => {
  switch (action.type) {
    case VERIFY_OTP:
      return {
        ...state,
        success: true,
        message: action.payload,
      };
    case OTP_ERROR:
      return {
        ...state,
        success: false,
        error: action.payload,
      };
    case CLEAR_OTP_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
