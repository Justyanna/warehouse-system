import React from "react";
import { Route, Switch } from "react-router-dom";
import { LoginPage, MainPage } from "./pages";
import { useAuth } from "./services/Auth";

const App = () => {
  const auth = useAuth();
  React.useEffect(() => {
    !auth.authorized && auth.initialize();
  }, [auth]);

  const authorizedRoutes = (
    <Switch>
      <Route exact path="/main" component={MainPage} />
    </Switch>
  );

  const unauthorizedRoutes = (
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/" />
    </Switch>
  );

  return auth.authorized ? authorizedRoutes : unauthorizedRoutes;
};

export default App;
