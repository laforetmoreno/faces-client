import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={() => <h1>teste</h1>} />
      <Route path="/admin" component={App} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
