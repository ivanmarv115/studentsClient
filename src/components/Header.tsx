import React from "react";
import Button from "react-bootstrap/Button";
import { Container, Navbar, NavbarToggle } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

const Header = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand>Students</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
