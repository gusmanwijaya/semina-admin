import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavLink from "../NavLink";

const ComponentNavbar = () => {
  const navigate = useNavigate();
  const isLogin = false;

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand>Dashboard</Navbar.Brand>
        <Nav className="me-auto">
          <NavLink action={() => navigate("/category")}>Category</NavLink>
          <NavLink action={() => navigate("/speaker")}>Speaker</NavLink>
          <NavLink action={() => navigate("/event")}>Event</NavLink>
          <NavLink action={() => navigate("/participant")}>Participant</NavLink>
          <NavLink action={() => navigate("/transaction")}>Transaction</NavLink>
        </Nav>
        <Nav>
          {!isLogin && (
            <NavLink action={() => navigate("/sign-in")}>Sign In</NavLink>
          )}
        </Nav>
        <Nav>{isLogin && <NavLink>Username</NavLink>}</Nav>
      </Container>
    </Navbar>
  );
};

export default ComponentNavbar;
