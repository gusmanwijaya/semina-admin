import React from "react";
import { Nav } from "react-bootstrap";

const NavLink = ({ children, action }) => {
  return <Nav.Link onClick={action}>{children}</Nav.Link>;
};

export default NavLink;
