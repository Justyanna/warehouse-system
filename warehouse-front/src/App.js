import React from "react";
import { Route, Switch } from "react-router-dom";
import {LoginPage} from "./pages";

const App = () => {
  return (
    <Switch>
      <Route exact path="/"></Route>
      <Route exact path="/login" component={LoginPage}></Route>
    </Switch>
  );
};
export default App;
