import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import logo from './vette-logo.jpg';
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Header = ({ isAuthenticated, handleLogout }) => {
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
            {isAuthenticated ? (
              <>
                <Button as={Link} to="/add-vette" className="mr-3">
                  New Vette
                </Button>
                <Button
                  onClick={() => handleLogout()}
                  variant="outline-primary"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button as={Link} to="/login" className="mr-3">
                  Login
                </Button>
                <Button as={Link} to="/signup" variant="outline-primary">
                  Sign Up
                </Button>
              </>
            )}
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
