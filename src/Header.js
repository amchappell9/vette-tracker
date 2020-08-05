import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import logo from './vette-logo.jpg';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='py-3 shadow-sm'>
      <Container fluid>
        <Row>
          <Col>Vette Tracker</Col>
          <Col>
            <Nav fill>
              <Nav.Item>
                <Nav.Link as={Link} to='/'>
                  Home
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to='/vettes'>
                  Vettes
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to='/trends'>
                  Trends
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to='/resources'>
                  Resources
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col>
            <Button href='/new-vette'>New Vette</Button>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
