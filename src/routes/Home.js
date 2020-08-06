import React from 'react';
import { Jumbotron } from 'react-bootstrap';

const Home = () => {
  return (
    <div>
      <Jumbotron>
        <h1>Vette Tracker</h1>
        <p>
          Welcome to Vette Tracker! Use this tool to track Corvettes for sale
          and view trends over time.
        </p>
      </Jumbotron>
    </div>
  );
};

export default Home;
