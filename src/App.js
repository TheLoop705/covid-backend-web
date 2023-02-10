import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import { AuthProvider } from "./Auth";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute path="/" component={Home} />
      </Switch>
    </AuthProvider>
  );
};

export default App;
