import React from "react";
import {
  CloseButton,
  Figure,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import Button from "../../components/Button";
import TextInputWithLabel from "../../components/TextInputWithLabel";
import SelectBox from "../../components/SelectBox";

const EventForm = ({
  handleSubmit,
  form,
  handleChange,
  isLoading,
  edit,
  list,
  handlePlusKeyPoint,
  handleChangeKeyPoint,
  handleMinusKeyPoint,
}) => {
  return (
    <Form className="mb-2">
      <TextInputWithLabel
        placeholder={"Masukkan judul"}
        label={"Judul"}
        name="title"
        value={form.title}
        type="text"
        onChange={handleChange}
      />

      <TextInputWithLabel
        placeholder={"Masukkan harga"}
        label={"Harga"}
        name="price"
        value={form.price}
        type="number"
        onChange={handleChange}
      />

      <TextInputWithLabel
        placeholder={"Masukkan stok"}
        label={"Stok"}
        name="stock"
        value={form.stock}
        type="number"
        onChange={handleChange}
      />

      <TextInputWithLabel
        placeholder={"Masukkan tanggal acara"}
        label={"Tanggal"}
        name="date"
        value={form.date}
        type="datetime-local"
        onChange={handleChange}
      />

      <TextInputWithLabel
        placeholder={"Masukkan about"}
        label={"About"}
        name="about"
        value={form.about}
        type="text"
        onChange={handleChange}
      />

      <TextInputWithLabel
        placeholder={"Masukkan tempat acara"}
        label={"Tempat acara"}
        name="venueName"
        value={form.venueName}
        type="text"
        onChange={handleChange}
      />

      <TextInputWithLabel
        placeholder={"Masukkan tagline"}
        label={"Tagline"}
        name="tagline"
        value={form.tagline}
        type="text"
        onChange={handleChange}
      />

      <Form.Label>Key Point</Form.Label>
      {form.keyPoint.map((value, index) => (
        <InputGroup className="mb-3" key={index}>
          <FormControl
            placeholder="Masukkan keypoint"
            value={value}
            type="text"
            name="key"
            onChange={(event) => {
              handleChangeKeyPoint(event, index);
            }}
          />
          {index !== 0 && (
            <InputGroup.Text id="basic-addon2">
              <CloseButton onClick={() => handleMinusKeyPoint(index)} />
            </InputGroup.Text>
          )}
        </InputGroup>
      ))}

      <Button
        variant="success"
        action={handlePlusKeyPoint}
        size="sm"
        className="mb-2"
      >
        Tambah keypoint
      </Button>

      <SelectBox
        label={"Category"}
        placeholder={"Masukkan kategori"}
        name="category"
        value={form.category}
        options={list.category}
        isClearable={true}
        handleChange={(event) => handleChange(event)}
      />

      <SelectBox
        label={"Speaker"}
        placeholder={"Masukkan speaker"}
        name="speaker"
        value={form.speaker}
        options={list.speaker}
        isClearable={true}
        handleChange={(event) => handleChange(event)}
      />

      <TextInputWithLabel
        placeholder={"Masukkan cover"}
        label={"Cover"}
        name="cover"
        type="file"
        onChange={handleChange}
      />
      {form.cover !== "" && (
        <div>
          <Figure>
            <Figure.Image
              width={171}
              height={180}
              alt="171x180"
              src={form.cover}
            />

            <Figure.Caption>Preview image cover</Figure.Caption>
          </Figure>
        </div>
      )}
      <Button variant="primary" action={handleSubmit} loading={isLoading}>
        {edit ? "Ubah" : "Simpan"}
      </Button>
    </Form>
  );
};

export default EventForm;
