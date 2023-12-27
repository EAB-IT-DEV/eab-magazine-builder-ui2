import React from "react";
import { Navbar, Container } from "react-bootstrap";

let Header = () => {
  return (
    <Navbar variant="dark" className="color-nav p-3">
      <Container>
        <Navbar.Brand>Design "Connect Future" Magazine Cover</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
