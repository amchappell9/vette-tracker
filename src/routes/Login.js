import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useHistory, useLocation } from "react-router-dom";

export const Login = ({ handleAuth }) => {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  return (
    <Container>
      <Row>
        <Col xs="12">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Login</Card.Title>
              <Card.Text>Click below to login</Card.Text>
              <Button
                onClick={() => {
                  handleAuth((response) => {
                    console.log(response);
                    history.replace(from);
                  });
                }}
              >
                Login
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
