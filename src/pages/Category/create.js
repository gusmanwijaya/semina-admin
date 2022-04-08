import React, { useState } from "react";
import { Container } from "react-bootstrap";
import BreadCrumb from "../../components/BreadCrumb";
import Alert from "../../components/Alert";
import Form from "./form";

const Create = () => {
  const [form, setForm] = useState({
    name: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // action simpan categories
  };

  return (
    <Container>
      <BreadCrumb
        textSecond={"Categories"}
        urlSecond={"/categories"}
        textThird="Create"
      />
      <Alert type="danger" message={"Nama kategori tidak boleh kosong"} />
      <Form
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default Create;
