import { useState } from "react";
import { useDispatch } from "react-redux";
import { clearError, registerUser } from "redux/actions";

interface IRegisterData {
  name: string;
  email: string;
  password: string;
}

const useRegisterForm = (
  registerData: IRegisterData,
  confirmPassword: string
) => {
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { name, email, password } = registerData;
  // eslint-disable-next-line
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const validate = () => {
    if (email === "") {
      setError(true);
    } else if (emailRegex.test(email) === false) {
      setError(true);
    } else if (
      password === "" ||
      password.length < 6 ||
      password.trim().length < 6
    ) {
      setError(true);
    } else if (password !== confirmPassword) {
      setError(true);
    } else if (
      name === "" ||
      name.length < 5 ||
      name.trim().length < 5 ||
      name.length > 100 ||
      name.trim().length > 100
    ) {
      setError(true);
    } else {
      setError(false);
      dispatch(registerUser(registerData));
    }
  };

  const resetError = () => {
    setError(false);
    dispatch(clearError());
  };

  return [error, validate, resetError] as [boolean, () => void, () => void];
};

export default useRegisterForm;
