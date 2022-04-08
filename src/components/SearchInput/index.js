import React from "react";
import { Form } from "react-bootstrap";

const SearchInput = ({ handleChange, query }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Control
        type="text"
        placeholder="Masukkan pencarian disini"
        value={query}
        name="query"
        onChange={handleChange}
      />
    </Form.Group>
  );
};

export default SearchInput;
