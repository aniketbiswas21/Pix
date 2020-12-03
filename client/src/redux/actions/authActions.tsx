import axios from "axios";
import { Dispatch } from "redux";
import { AuthActionTypes, UserLoginForm, UserRegisterForm } from "redux/type";
import { CLEAR_ERROR, LOGIN_USER, REGISTER_USER, USER_ERROR } from "../types";

//Login User
export const loginUser = (user: UserLoginForm) => async (
  dispatch: Dispatch<AuthActionTypes>
) => {
  try {
    const res = await axios.post("/auth/login", user, {
      withCredentials: true,
    });
    dispatch({
      type: LOGIN_USER,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: USER_ERROR,
      payload: err.response.data,
    });
  }
};

// Register User
export const registerUser = (user: UserRegisterForm) => async (
  dispatch: Dispatch<AuthActionTypes>
) => {
  try {
    const res = await axios.post("/auth/register", user, {
      withCredentials: true,
    });
    dispatch({
      type: REGISTER_USER,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: USER_ERROR,
      payload: err.response.data,
    });
  }
};

//Clear Error
export const clearError = () => {
  return {
    type: CLEAR_ERROR,
  };
};
