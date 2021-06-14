import React, { useContext } from "react";
import { Route, Redirect, useParams } from "react-router-dom";
import UserInfoContext from "./contexts/UserInfoContext";

const AuthenticatedRoute = ({ children, ...rest }) => {
  const userInfo = useContext(UserInfoContext);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        !!userInfo ? (
          children
        ) : (
          <Redirect to={{ pathname: "/sign-in", state: { from: location } }} />
        )
      }
    />
  );
};

export default AuthenticatedRoute;
