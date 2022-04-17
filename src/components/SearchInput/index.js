import React from "react";
import { Form } from "react-bootstrap";

const SearchInput = ({ handleChange, value, name, placeholder }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Control
        type="text"
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={handleChange}
      />
    </Form.Group>
  );
};

export default SearchInput;
