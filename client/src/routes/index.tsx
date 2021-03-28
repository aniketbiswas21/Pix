import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";
import Chat from "../components/Chat";
import Login from "pages/Login/Login";
import Home from "pages/Home/Home";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} isLoginRoute />
      <Route exact path="/register" component={Login} isLoginRoute />
      <Route exact path="/verifyOTP" component={Login} isVerificationRoute />
      <Route exact path="/home" component={Home} isPrivate />
      <Route path="/chat/:id" component={Chat} isPrivate />
    </Switch>
  );
};

export default Routes;
