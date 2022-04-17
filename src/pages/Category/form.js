import React from "react";
import { Form } from "react-bootstrap";
import Button from "../../components/Button";
import TextInputWithLabel from "../../components/TextInputWithLabel";

const CategoryForm = ({
  handleSubmit,
  form,
  handleChange,
  isLoading,
  edit,
}) => {
  return (
    <Form>
      <TextInputWithLabel
        placeholder={"Masukkan nama kategori"}
        label={"Nama Kategori"}
        name="name"
        value={form.name}
        type="text"
        onChange={handleChange}
      />
      <Button variant="primary" action={handleSubmit} loading={isLoading}>
        {edit ? "Ubah" : "Simpan"}
      </Button>
    </Form>
  );
};

export default CategoryForm;
