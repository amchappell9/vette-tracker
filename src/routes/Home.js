import React, { useState } from "react";
import { Jumbotron, Button } from "react-bootstrap";

const Home = () => {
  const [message, setMessage] = useState("");

  const callTest = () => {
    fetch("/.netlify/functions/test-call")
      .then((response) => response.json())
      .then((json) => setMessage(json.msg));
  };

  return (
    <div>
      <Jumbotron>
        <h1>Vette Tracker</h1>
        <p>
          Welcome to Vette Tracker! Use this tool to track Corvettes for sale
          and view trends over time.
        </p>
        <p>
          <Button onClick={callTest}>Test Call</Button>
        </p>
        {message !== "" && <p>{message}</p>}
      </Jumbotron>
    </div>
  );
};

export default Home;
