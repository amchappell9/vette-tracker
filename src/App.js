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
import AllVettesFake from "./routes/AllVettes/AllVettesFake";
import SignUpConfirmation from "./routes/SignUp/SignUpConfirmation";
// import authentication from "./authentication";

const getBodyBgColor = (path) => {
  let className = "";

  switch (path) {
    case "/":
      className = "bg-gray-700";
      break;

    default:
      className = "bg-gray-50";
      break;
  }

  return className;
};

function App() {
  const [userInfo, setUserInfo] = useState(null);

  const auth = new GoTrue({
    APIUrl: "https://vette-tracker.netlify.app/.netlify/identity",
  });

  const signUpNewUser = (email, password, handleSuccess, handleError) => {
    auth
      .signup(email, password)
      .then((response) => handleSuccess(response))
      .catch((error) => handleError(JSON.parse(JSON.stringify(error))));
  };

  const confirmUser = (token) => {
    auth
      .confirm(token)
      .then((response) => setUserConfirmationToken(null))
      .catch((error) => {
        const parsedError = JSON.parse(JSON.stringify(error));

        setUserConfirmationToken(null);
        if (parsedError.json && parsedError.json.msg) {
          setUserConfirmationErrorMessage(parsedError.json.msg);
        } else {
          setUserConfirmationErrorMessage("An error has happened");
        }
      });
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

  // This definitely needs to be moved to a reducer: https://www.robinwieruch.de/react-hooks-fetch-data
  const [userConfirmationToken, setUserConfirmationToken] = useState(null);
  const [
    userConfirmationErrorMessage,
    setUserConfirmationErrorMessage,
  ] = useState(null);

  let location = useLocation();
  let history = useHistory();

  // Check for confirmation token in hash
  useEffect(() => {
    if (location.hash && location.hash.indexOf("#confirmation_token") !== -1) {
      setUserConfirmationToken(location.hash.substring(20));
      history.push({ pathname: "/sign-up-confirmation" });
    }
  }, [location, history]);

  return (
    <div className={`min-h-screen ${getBodyBgColor(location.pathname)}`}>
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
            {console.log(userConfirmationToken)}
            <Route path="/sign-up-confirmation">
              <SignUpConfirmation
                confirmationToken={userConfirmationToken}
                confirmUser={confirmUser}
                userConfirmationErrorMessage={userConfirmationErrorMessage}
              />
            </Route>
            <AuthenticatedRoute path="/add-vette">
              <AddVette />
            </AuthenticatedRoute>
            <AuthenticatedRoute path="/vettes/:vetteId">
              <VetteDetail />
            </AuthenticatedRoute>
            <AuthenticatedRoute path="/vettes">
              {/* <AllVettes /> */}
              <AllVettesFake />
            </AuthenticatedRoute>
            <AuthenticatedRoute path="/trends">
              <Trends />
            </AuthenticatedRoute>
            <AuthenticatedRoute path="/resources">
              <Resources />
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
