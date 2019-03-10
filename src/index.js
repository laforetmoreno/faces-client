import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Admin from "./pages/Admin/Admin";
import App from "./pages/App/App";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={App} />
      <Route path="/admin" component={Admin} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
