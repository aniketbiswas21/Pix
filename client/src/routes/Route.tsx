import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { RootState } from "redux/type";

interface IProps extends RouteProps {
  component: React.FC | (() => JSX.Element);
  isPrivate?: boolean;
  isLoginRoute?: boolean;
  isVerificationRoute?: boolean;
}

function RouteWrapper({
  component: Component,
  isPrivate,
  isLoginRoute,
  isVerificationRoute,
  ...rest
}: IProps) {
  const auth = useSelector((state: RootState) => state.auth);
  /**
   * Redirect user to verification page if he tries to access a private route
   * without authentication.
   */
  if (
    isPrivate &&
    auth?.isAuthenticated === true &&
    auth?.user?.verified === false
  ) {
    return <Redirect to="/verifyOTP" />;
  }
  /**
   * Redirect user to login page if he tries to access a private route
   * without authentication.
   */
  if (isPrivate && auth?.isAuthenticated === false) {
    return <Redirect to="/" />;
  }

  /**
   * Redirect user to Main page if he tries to access a non private route
   * (SignIn or SignUp) after being authenticated.
   */

  if (isLoginRoute && auth?.isAuthenticated === true) {
    return <Redirect to="/home" />;
  }
  /**
   * Redirect user to Main page if he tries to access a verification route
   * (SignIn or SignUp) after being authenticated.
   */
  if (isVerificationRoute && auth?.user?.verified === true) {
    return <Redirect to="/home" />;
  }
  /**
   * Redirect user to Login page if he tries to access a verification route
   * if not authenticated
   */
  if (isVerificationRoute && auth?.isAuthenticated === false) {
    return <Redirect to="/" />;
  }
  /**
   * If not included on previous cases, redirect user to the desired route.
   */
  return <Route {...rest} component={Component} />;
}

export default RouteWrapper;
