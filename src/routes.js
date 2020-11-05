import React from "react";
import { Switch, Route } from "react-router-dom";
import Hoc from "./hoc";

import Register from './container/pages/Register'
import Login from './container/pages/Login'

import Home from './container/pages/Home'

const BaseRouter = () => (
  <Hoc>
    <Switch>
      <Route exact path="/register/" component={Register} />
      <Route exact path="/login/" component={Login} />

      <Route exact path="/" component={Home} />
    </Switch>
  </Hoc>
);

export default BaseRouter;