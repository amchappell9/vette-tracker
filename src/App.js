import React, { useState, useEffect } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import GoTrue from "gotrue-js";

import Home from "./routes/Home/Home";
import Trends from "./routes/Trends";
import Resources from "./routes/Resources";
import VetteDetail from "./routes/VetteDetail/VetteDetail";
import AddVette from "./routes/AddVette/AddVette";
import NoMatch from "./routes/NoMatch";
import Login from "./routes/Login";
import SignUp from "./routes/SignUp/SignUp";
import AuthenticatedRoute from "./AuthenticatedRoute";
import UserInfoContext from "./contexts/UserInfoContext";
import AllVettes from "./routes/AllVettes/AllVettes";
import SignUpConfirmation from "./routes/SignUp/SignUpConfirmation";
import UnauthPage from "./components/layouts/UnauthPage";
import AuthenticatedPage from "./components/layouts/AuthenticatedPage";

const persistUserInfo = (userInfo) => {
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
};

const getUserInfoFromLocalStorage = () => {
  if (localStorage.getItem("userInfo")) {
    return JSON.parse(localStorage.getItem("userInfo"));
  }

  return null;
};

function App() {
  const [userInfo, setUserInfo] = useState(getUserInfoFromLocalStorage());
  let location = useLocation();
  let history = useHistory();

  const auth = new GoTrue({
    APIUrl: "https://vette-tracker.netlify.app/.netlify/identity",
  });

  const signUpNewUser = (email, password, handleSuccess, handleError) => {
    auth
      .signup(email, password)
      .then((response) => handleSuccess(response))
      .catch((error) => handleError(JSON.parse(JSON.stringify(error))));
  };

  const authenticate = (email, password, handleSuccess, handleError) => {
    auth
      .login(email, password, true)
      .then((response) => {
        setUserInfo(response);
        handleSuccess(response);
      })
      .catch((error) => handleError(JSON.parse(JSON.stringify(error))));
  };

  const handleLogout = () => {
    const user = auth.currentUser();

    user.logout().then(() => {
      setUserInfo(null);
    });
  };

  // If userInfo changes persist it to local storage
  useEffect(() => {
    if (userInfo) {
      persistUserInfo(userInfo);
    }
  }, [userInfo]);

  // Redirect user to Vettes page if they're logged in
  useEffect(() => {
    if (
      !!userInfo &&
      (location.pathname === "/" ||
        location.pathname === "/sign-in" ||
        location.pathname === "/sign-up")
    ) {
      history.push({ pathname: "/vettes" });
    }
  }, [userInfo, location, history]);

  // Check for confirmation token in hash. If it's there redirect them to the confirmation page to be confirmed
  useEffect(() => {
    if (location.hash && location.hash.indexOf("#confirmation_token") !== -1) {
      history.push({ pathname: "/sign-up-confirmation" });
    }
  }, [location, history]);

  return (
    <>
      <UserInfoContext.Provider value={userInfo}>
        <Switch>
          {/* Vette Detail */}
          <AuthenticatedRoute path="/vettes/:vetteId">
            <AuthenticatedPage handleLogout={handleLogout}>
              <VetteDetail />
            </AuthenticatedPage>
          </AuthenticatedRoute>

          {/* All Vettes */}
          <AuthenticatedRoute path="/vettes">
            <AuthenticatedPage handleLogout={handleLogout}>
              <AllVettes />
            </AuthenticatedPage>
          </AuthenticatedRoute>

          {/* Add/Edit Vette */}
          <AuthenticatedRoute path="/add-vette">
            <AuthenticatedPage handleLogout={handleLogout}>
              <AddVette />
            </AuthenticatedPage>
          </AuthenticatedRoute>

          {/* Trends */}
          <AuthenticatedRoute path="/trends">
            <AuthenticatedPage handleLogout={handleLogout}>
              <Trends />
            </AuthenticatedPage>
          </AuthenticatedRoute>

          {/* Resources */}
          <AuthenticatedRoute path="/resources">
            <AuthenticatedPage handleLogout={handleLogout}>
              <Resources />
            </AuthenticatedPage>
          </AuthenticatedRoute>

          {/* Home Page */}
          <Route exact path="/">
            <Home />
          </Route>

          {/* Sign In */}
          <Route path="/sign-in">
            <UnauthPage>
              <Login handleAuth={authenticate} />
            </UnauthPage>
          </Route>

          {/* Sign Up */}
          <Route path="/sign-up">
            <UnauthPage>
              <SignUp handleSignUp={signUpNewUser} />
            </UnauthPage>
          </Route>

          {/* Sign Up Confirmation */}
          <Route path="/sign-up-confirmation">
            <UnauthPage>
              <SignUpConfirmation auth={auth} />
            </UnauthPage>
          </Route>

          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </UserInfoContext.Provider>
    </>
  );
}

export default App;
