import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";
import Chat from "../components/Chat";
import Login from "pages/Login/Login";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Login} />
      <Route path="/chat/:id" component={Chat} />
    </Switch>
  );
};

export default Routes;
