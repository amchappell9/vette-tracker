import React, { useState } from "react";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import { Switch, Route } from "react-router-dom";
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

function App() {
  const [userInfo, setUserInfo] = useState(null);

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
    <div className="bg-gray-700 min-h-screen">
      <UserInfoContext.Provider value={userInfo}>
        <Header isAuthenticated={!!userInfo} handleLogout={logout} />
        <main>
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
