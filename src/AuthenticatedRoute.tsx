import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserInfoContext from "./contexts/UserInfoContext";

type AuthenticatedRouteProps = {
  children: React.ReactNode;
  path: string;
};

const AuthenticatedRoute = ({ children, ...rest }: AuthenticatedRouteProps) => {
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
