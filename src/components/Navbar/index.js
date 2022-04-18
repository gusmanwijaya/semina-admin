/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import NavLink from "../NavLink";
import { useDispatch } from "react-redux";
import { userSignOut } from "../../redux/auth/actions";

const ComponentNavbar = ({ payload }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogout = () => {
    dispatch(userSignOut());
    localStorage.clear();
    navigate("/");
  };

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand>Dashboard</Navbar.Brand>
        <Nav className="me-auto">
          <NavLink action={() => navigate("/category")}>Category</NavLink>
          <NavLink action={() => navigate("/speaker")}>Speaker</NavLink>
          <NavLink action={() => navigate("/event")}>Event</NavLink>
          <NavLink action={() => navigate("/transaction")}>Transaction</NavLink>
        </Nav>
        <Nav>
          <NavLink action={onLogout}>{payload?.name}</NavLink>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default ComponentNavbar;
