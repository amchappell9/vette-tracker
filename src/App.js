import React, { useState } from "react";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import { Switch, Route, useLocation } from "react-router-dom";
import netlifyIdentity from "netlify-identity-widget";

import Home from "./routes/Home/Home";
import AllVettes from "./routes/AllVettes/AllVettes";
import Trends from "./routes/Trends";
import Resources from "./routes/Resources";
import VetteDetail from "./routes/VetteDetail";
import AddVette from "./routes/AddVette/AddVette";
import NoMatch from "./routes/NoMatch";
import { Login } from "./routes/Login";
import AuthenticatedRoute from "./AuthenticatedRoute";
import UserInfoContext from "./contexts/UserInfoContext";
// import authentication from "./authentication";

const getBodyBgColor = (path) => {
  let className = "";

  switch (path) {
    case "/":
      className = "bg-gray-700";
      break;

    default:
      className = "";
      break;
  }

  return className;
};

function App() {
  const [userInfo, setUserInfo] = useState(null);
  let location = useLocation();

  const authenticate = (callback) => {
    netlifyIdentity.open();
    netlifyIdentity.on("login", (user) => {
      console.log(user);
      setUserInfo(user);
      callback(user);
    });
  };

  const logout = (callback) => {
    netlifyIdentity.logout();
    netlifyIdentity.on("logout", () => {
      setUserInfo(null);
      callback();
    });
  };

  return (
    <div className={`min-h-screen ${getBodyBgColor(location.pathname)}`}>
      <UserInfoContext.Provider value={userInfo}>
        <Header isAuthenticated={!!userInfo} handleLogout={logout} />
        <main className="min-main-height">
          <Switch>
            <Route path="/sign-in">
              <Login handleAuth={authenticate} />
            </Route>
            <AuthenticatedRoute path="/add-vette">
              <AddVette />
            </AuthenticatedRoute>
            <AuthenticatedRoute path="/vettes/:id">
              <VetteDetail />
            </AuthenticatedRoute>
            <AuthenticatedRoute path="/vettes">
              <AllVettes />
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
