/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import TableWithAction from "../../components/TableWithAction";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategory } from "../../redux/category/actions";
import Alert from "../../components/Alert";
import Swal from "sweetalert2";
import { deleteData } from "../../utils/fetchData";
import { setNotification } from "../../redux/notification/actions";

const Category = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notification = useSelector((state) => state.notification);
  const category = useSelector((state) => state.category);

  useEffect(() => {
    let { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};
    if (!token) return navigate("/");
  }, []);

  useEffect(() => {
    dispatch(fetchCategory());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apa kamu yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteData(`api/v1/category/destroy/${id}`);
        dispatch(setNotification(true, "success", "Berhasil hapus kategori!"));
        dispatch(fetchCategory());
      }
    });
  };

  return (
    <Container>
      <Button className="mb-2" action={() => navigate("/category/create")}>
        Tambah
      </Button>
      {notification.status && (
        <Alert
          type={notification.typeNotification}
          message={notification.message}
        />
      )}
      <TableWithAction
        status={category.status}
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
