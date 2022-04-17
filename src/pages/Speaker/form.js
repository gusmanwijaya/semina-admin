import React from "react";
import { Figure, Form } from "react-bootstrap";
import Button from "../../components/Button";
import TextInputWithLabel from "../../components/TextInputWithLabel";

const SpeakerForm = ({ handleSubmit, form, handleChange, isLoading, edit }) => {
  return (
    <Form>
      <TextInputWithLabel
        placeholder={"Masukkan nama speaker"}
        label={"Nama"}
        name="name"
        value={form.name}
        type="text"
        onChange={handleChange}
      />
      <TextInputWithLabel
        placeholder={"Masukkan role"}
        label={"Role"}
        name="role"
        value={form.role}
        type="text"
        onChange={handleChange}
      />
      <TextInputWithLabel
        placeholder={"Masukkan Avatar"}
        label={"Avatar"}
        name="avatar"
        type="file"
        onChange={handleChange}
      />
      {form.avatar !== "" && (
        <div>
          <Figure>
            <Figure.Image
              width={171}
              height={180}
              alt="171x180"
              src={form.avatar}
            />

            <Figure.Caption>Preview image avatar</Figure.Caption>
          </Figure>
        </div>
      )}
      <Button variant="primary" action={handleSubmit} loading={isLoading}>
        {edit ? "Ubah" : "Simpan"}
      </Button>
    </Form>
  );
};

export default SpeakerForm;
