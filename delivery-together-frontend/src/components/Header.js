import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Delivery Together</Navbar.Brand>
        <Nav className="me-auto">
          &nbsp;
          <Link to="/map" className="nav-link">
            매칭 신청
          </Link>
          &nbsp;
          <Link to="/matchingForm" className="nav-link">
            매칭 등록
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
