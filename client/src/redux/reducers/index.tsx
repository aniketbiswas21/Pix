import { combineReducers } from "redux";
import authReducer from "./authReducer";
import otpReducer from "./otpReducer";

//combine multiple reducers
export default combineReducers({
  //reducers!!
  auth: authReducer,
  otp: otpReducer,
});
