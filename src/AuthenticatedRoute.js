import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserInfoContext from "./contexts/UserInfoContext";

const AuthenticatedRoute = ({ children }) => {
  const userInfo = useContext(UserInfoContext);

  return (
    <Route
      render={({ location }) =>
        !!userInfo ? (
          children
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default AuthenticatedRoute;
