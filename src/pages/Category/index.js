import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import Button from "../../components/Button";
import SearchInput from "../../components/SearchInput";
import TableWithAction from "../../components/TableWithAction";

const Category = () => {
  const navigate = useNavigate();
  const data = [{ name: "Fullstack", id: 1, user: "Gusman Wijaya" }];

  return (
    <Container>
      <Button action={() => navigate("/categories/create")}>Tambah</Button>
      <BreadCrumb textSecond="Categories" />
      <SearchInput />
      <TableWithAction
        thead={["Nama", "Aksi"]}
        data={data}
        tbody={["name", "user"]}
      />
    </Container>
  );
};

export default Category;
