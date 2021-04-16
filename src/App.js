import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Switch, Route, useLocation } from "react-router-dom";
// import netlifyIdentity from "netlify-identity-widget";

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
  // const [userInfo, setUserInfo] = useState(null);
  // eslint-disable-next-line
  const [userInfo, setUserInfo] = useState({
    firstName: "Austin",
    lastName: "Chappell",
    email: "amchappell9@gmail.com",
  });
  let location = useLocation();

  const authenticate = (callback) => {
    // netlifyIdentity.open();
    // netlifyIdentity.on("login", (user) => {
    //   console.log(user);
    //   setUserInfo(user);
    //   callback(user);
    // });
  };

  const logout = (callback) => {
    // netlifyIdentity.logout();
    // netlifyIdentity.on("logout", () => {
    //   setUserInfo(null);
    //   callback();
    // });
  };

  return (
    <div className={`min-h-screen ${getBodyBgColor(location.pathname)}`}>
      <UserInfoContext.Provider value={userInfo}>
        <Header isAuthenticated={!!userInfo} handleLogout={logout} />
        <main>
          <Switch>
            <Route path="/sign-in">
              <Login handleAuth={authenticate} />
            </Route>
            <Route path="/sign-up">
              <SignUp />
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
