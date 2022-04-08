import React from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import Button from "../../components/Button";
import SearchInput from "../../components/SearchInput";
import TableWithAction from "../../components/TableWithAction";

const Speaker = () => {
  const navigate = useNavigate();
  const data = [{ name: "Gusman Wijaya", id: 1, role: "Fullstack" }];

  return (
    <Container>
      <Button action={() => navigate("/speakers/create")}>Tambah</Button>
      <BreadCrumb textSecond="Speakers" />
      <SearchInput />
      <TableWithAction
        thead={["Nama", "Role", "Aksi"]}
        data={data}
        tbody={["name", "role"]}
      />
    </Container>
  );
};

export default Speaker;
