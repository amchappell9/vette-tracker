import React from 'react';
import './App.css';
import Header from './Header';
import Footer from './Footer';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import Home from './routes/Home';
import AllVettes from './routes/AllVettes';
import Trends from './routes/Trends';
import Resources from './routes/Resources';
import VetteDetail from './routes/VetteDetail';

function App() {
  return (
    <div>
      <Header />
      <main>
        <Container className='pt-4'>
          <Switch>
            <Route path='/vettes/:id'>
              <VetteDetail />
            </Route>
            <Route path='/vettes'>
              <AllVettes />
            </Route>
            <Route path='/trends'>
              <Trends />
            </Route>
            <Route path='/resources'>
              <Resources />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
