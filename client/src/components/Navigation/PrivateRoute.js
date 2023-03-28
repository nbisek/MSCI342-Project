import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from "../Home";
import Login from "../Login/Login";
import history from "./history";
import SignUp from "../Login/SignUp";
import MyGroups from "../MyGroups/MyGroups";
import Settings from "../Settings/Settings";
import FindGroups from "../FindGroups";
import CreateGroup from "../CreateGroup/CreateGroup";
import Group from "../Group/Group";
import ForgotPassword from "../ForgotPassword";

export default function PrivateRoute(
  {
    //authenticated,
    //...rest
  }
) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/mygroups" exact component={MyGroups} />
        <Route path="/group" exact component={Group} />
        <Route path="/settings" exact component={Settings} />
        <Route path="/findgroups" component={FindGroups} />
        <Route path="/forgotpassword" component={ForgotPassword} />
      </Switch>
    </Router>
  );
}
