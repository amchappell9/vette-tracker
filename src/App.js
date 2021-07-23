import React, { useState, useEffect } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import GoTrue from "gotrue-js";

import Header from "./Header";
import Footer from "./Footer";
import Home from "./routes/Home/Home";
// import AllVettes from "./routes/AllVettes/AllVettes";
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
import Page from "./components/Page";

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

  const logout = (callback) => {};

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
    <div className="min-h-screen">
      <UserInfoContext.Provider value={userInfo}>
        <Header isAuthenticated={true} handleLogout={logout} />
        <main>
          <Switch>
            <Route path="/sign-in">
              <Login handleAuth={authenticate} />
            </Route>
            <Route path="/sign-up">
              <SignUp handleSignUp={signUpNewUser} />
            </Route>
            <Route path="/sign-up-confirmation">
              <SignUpConfirmation auth={auth} />
            </Route>
            <AuthenticatedRoute path="/add-vette">
              <AddVette />
            </AuthenticatedRoute>
            <AuthenticatedRoute path="/vettes/:vetteId">
              <VetteDetail />
            </AuthenticatedRoute>
            <AuthenticatedRoute path="/vettes">
              <AllVettes />
            </AuthenticatedRoute>
            <AuthenticatedRoute path="/trends">
              <Page>
                <Trends />
              </Page>
            </AuthenticatedRoute>
            <AuthenticatedRoute path="/resources">
              <Page>
                <Resources />
              </Page>
            </AuthenticatedRoute>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </main>
        <Footer />
      </UserInfoContext.Provider>
    </div>
  );
}

export default App;
