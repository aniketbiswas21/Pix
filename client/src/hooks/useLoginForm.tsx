import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearError, loginUser } from "redux/actions";

interface IloginData {
  email: string;
  password: string;
}

const useLoginForm = (loginData: IloginData) => {
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { email, password } = loginData;
  // eslint-disable-next-line
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const validate = () => {
    if (email === "") {
      setError(true);
    } else if (emailRegex.test(email) === false) {
      setError(true);
    } else if (password === "") {
      setError(true);
    } else {
      setError(false);
      dispatch(loginUser(loginData));
    }
  };

  const resetError = () => {
    setError(false);
    dispatch(clearError());
  };

  return [error, validate, resetError] as [boolean, () => void, () => void];
};

export default useLoginForm;
