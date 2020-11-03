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
// import authentication from "./authentication";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const authenticate = () => {
    console.log(netlifyIdentity);
    netlifyIdentity.open();
    netlifyIdentity.on("login", (user) => {
      console.log(user);
      setIsAuthenticated(true);
      setUserInfo(user);
    });
  };

  const logout = () => {
    netlifyIdentity.logout();
    netlifyIdentity.on("logout", () => {
      setIsAuthenticated(false);
      setUserInfo(null);
    });
  };

  return (
    <div>
      <Header isAuthenticated={isAuthenticated} />
      <main>
        <Container className="pt-4">
          <Switch>
            <Route path="/login">
              <Login handleAuth={authenticate} />
            </Route>
            <Route path="/add-vette">
              <AddVette />
            </Route>
            <Route path="/vettes/:id">
              <VetteDetail />
            </Route>
            <Route path="/vettes">
              <AllVettes />
            </Route>
            <Route path="/trends">
              <Trends />
            </Route>
            <Route path="/resources">
              <Resources />
            </Route>
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
  );
}

export default App;
