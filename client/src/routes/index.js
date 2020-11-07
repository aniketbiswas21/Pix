import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";
import Chat from "../components/Chat";
import Home from "../components/Home";
import Login from "pages/Login/Login";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/chat/:id" component={Chat} />
    </Switch>
  );
};

export default Routes;
