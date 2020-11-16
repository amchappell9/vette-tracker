import React, { useState } from "react";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import { Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import netlifyIdentity from "netlify-identity-widget";

import Home from "./routes/Home";
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
    <UserInfoContext.Provider value={userInfo}>
      <div>
        <Header isAuthenticated={!!userInfo} handleLogout={logout} />
        <main>
          <Container className="pt-4">
            <Switch>
              <Route path="/login">
                <Login handleAuth={authenticate} />
              </Route>
              <AuthenticatedRoute
                isAuthenticated={!!userInfo}
                path="/add-vette"
              >
                <AddVette />
              </AuthenticatedRoute>
              <AuthenticatedRoute
                isAuthenticated={!!userInfo}
                path="/vettes/:id"
              >
                <VetteDetail />
              </AuthenticatedRoute>
              <AuthenticatedRoute isAuthenticated={!!userInfo} path="/vettes">
                <AllVettes />
              </AuthenticatedRoute>
              <AuthenticatedRoute isAuthenticated={!!userInfo} path="/trends">
                <Trends />
              </AuthenticatedRoute>
              <AuthenticatedRoute
                isAuthenticated={!!userInfo}
                path="/resources"
              >
                <Resources />
              </AuthenticatedRoute>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="*">
                <NoMatch />
              </Route>
            </Switch>
          </Container>
        </main>
        <Footer />
      </div>
    </UserInfoContext.Provider>
  );
}

export default App;
