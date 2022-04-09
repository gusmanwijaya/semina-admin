import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import Button from "../../components/Button";
import TableWithAction from "../../components/TableWithAction";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategory } from "../../redux/category/actions";
import Alert from "../../components/Alert";

const Category = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const notification = useSelector((state) => state.notification);
  const category = useSelector((state) => state.category);

  useEffect(() => {
    return () => {
      if (!auth.token) return navigate("/sign-in");
    };
  }, [auth.token, navigate]);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const handleDelete = (id) => {
    console.log(id);
  };

  return (
    <Container>
      <Button action={() => navigate("/category/create")}>Tambah</Button>
      <BreadCrumb textSecond="Category" />
      {notification.status && (
        <Alert
          type={notification.typeNotification}
          message={notification.message}
        />
      )}
      <TableWithAction
        thead={["Nama", "Aksi"]}
        data={category.data}
        tbody={["name"]}
        editUrl={`/category/edit`}
        deleteAction={(id) => handleDelete(id)}
      />
    </Container>
  );
};

export default Category;
