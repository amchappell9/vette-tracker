import React from "react";
import "./App.css";
import Header from "./Header";
import Footer from "./Footer";
import { Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Home from "./routes/Home";
import AllVettes from "./routes/AllVettes/AllVettes";
import Trends from "./routes/Trends";
import Resources from "./routes/Resources";
import VetteDetail from "./routes/VetteDetail";
import AddVette from "./routes/AddVette/AddVette";
import NoMatch from "./routes/NoMatch";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Container className="pt-4">
          <Switch>
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
