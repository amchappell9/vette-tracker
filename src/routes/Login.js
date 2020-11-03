import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export const Login = ({ handleAuth }) => {
  return (
    <Container>
      <Row>
        <Col xs="12">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Login</Card.Title>
              <Card.Text>Click below to login</Card.Text>
              <Button
                onClick={() => handleAuth((response) => console.log(response))}
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
