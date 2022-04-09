import React, { useState } from "react";
import { Container } from "react-bootstrap";
import BreadCrumb from "../../components/BreadCrumb";
import Alert from "../../components/Alert";
import Form from "./form";

const Edit = () => {
  const [form, setForm] = useState({
    name: "Gusman Wijaya",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // action simpan category
  };

  return (
    <Container>
      <BreadCrumb
        textSecond={"Category"}
        urlSecond={"/category"}
        textThird="Edit"
      />
      {/* <Alert type="danger" message={"Nama kategori tidak boleh kosong"} /> */}
      <Form
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default Edit;
