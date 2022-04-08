import React from "react";
import { Alert } from "react-bootstrap";

const ComponentAlert = ({ type, message }) => {
  return <Alert variant={type}>{message}</Alert>;
};

export default ComponentAlert;
