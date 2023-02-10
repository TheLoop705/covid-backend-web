import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";

const PrivateRoute = ({ name, component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      {!!currentUser ? (
        <Route
          {...rest}
          render={(routeProps) => <RouteComponent {...routeProps} />}
        />
      ) : (
        <Redirect to={"/login"} />
      )}
    </>
  );
};

export default PrivateRoute;
