import React from "react";
import { Form } from "react-bootstrap";
import TextInputWithLabel from "../../components/TextInputWithLabel";
import Button from "../../components/Button";

const FormSignIn = ({ form, handleChange, handleSubmit, isLoading }) => {
  return (
    <Form>
      <TextInputWithLabel
        placeholder="Masukkan email"
        label="Alamat Email"
        name="email"
        value={form.email}
        type="email"
        onChange={handleChange}
      />
      <TextInputWithLabel
        placeholder="Masukkan password"
        label="Password"
        name="password"
        value={form.password}
        type="password"
        onChange={handleChange}
      />
      <Button variant="primary" action={handleSubmit} loading={isLoading}>
        Submit
      </Button>
    </Form>
  );
};

export default FormSignIn;
