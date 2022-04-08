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
          <NavLink action={() => navigate("/categories")}>Categories</NavLink>
          <NavLink action={() => navigate("/speakers")}>Speakers</NavLink>
          <NavLink action={() => navigate("/events")}>Events</NavLink>
          <NavLink action={() => navigate("/participants")}>
            Participants
          </NavLink>
          <NavLink action={() => navigate("/transactions")}>
            Transactions
          </NavLink>
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
