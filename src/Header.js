import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import logo from './vette-logo.jpg';
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Header = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <header className="py-3 shadow-sm">
      <Container fluid>
        <Row>
          <Col>
            <span className="headingText font-weight-bold pl-4">
              Vette Tracker
            </span>
          </Col>
          <Col>
            <Nav fill>
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/"
                  className="font-weight-bold navLinks"
                >
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/vettes"
                  className="font-weight-bold navLinks"
                >
                  Vettes
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/trends"
                  className="font-weight-bold navLinks"
                >
                  Trends
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/resources"
                  className="font-weight-bold navLinks"
                >
                  Resources
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col className="pl-5">
            <Link to="/add-vette" className="btn btn-primary mr-3">
              New Vette
            </Link>
            <Button
              variant="outline-primary"
              onClick={() => loginWithRedirect()}
            >
              Login
            </Button>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
