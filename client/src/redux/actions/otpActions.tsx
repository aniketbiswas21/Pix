import axios from "axios";
import { Dispatch } from "redux";
import { OTPActionTypes } from "redux/type";
import { CLEAR_OTP_ERROR, OTP_ERROR, VERIFY_OTP } from "../types";

interface IOTPBody {
  otp: string;
}

//Login User
export const verifyOtp = (code: string) => async (
  dispatch: Dispatch<OTPActionTypes>
) => {
  try {
    const otpBody: IOTPBody = {
      otp: code,
    };
    const res = await axios.post("/auth/verify-otp", otpBody, {
      withCredentials: true,
    });
    dispatch({
      type: VERIFY_OTP,
      payload: res.data.message,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: OTP_ERROR,
      payload: err.response.data,
    });
  }
};

//Clear Error
export const clearOtpError = () => {
  return {
    type: CLEAR_OTP_ERROR,
  };
};
