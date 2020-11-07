import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

function RouteWrapper({
  component: Component,
  isPrivate,
  isLoginRoute,
  ...rest
}) {
  /**
   * Redirect user to SignIn page if he tries to access a private route
   * without authentication.
   */
  if (isPrivate) {
    return <Redirect to="/" />;
  }

  /**
   * Redirect user to Main page if he tries to access a non private route
   * (SignIn or SignUp) after being authenticated.
   */

  if (isLoginRoute) {
    return <Redirect to="/welcome" />;
  }

  /**
   * If not included on both previous cases, redirect user to the desired route.
   */
  return <Route {...rest} component={Component} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};

export default RouteWrapper;
