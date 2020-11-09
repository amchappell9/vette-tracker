import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthenticatedRoute = ({ isAuthenticated, children }) => {
  return (
    <Route
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default AuthenticatedRoute;
