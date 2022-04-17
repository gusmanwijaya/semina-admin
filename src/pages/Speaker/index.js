/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Alert from "../../components/Alert";
import Button from "../../components/Button";
import SearchInput from "../../components/SearchInput";
import TableWithAction from "../../components/TableWithAction";
import { setNotification } from "../../redux/notification/actions";
import { fetchSpeaker, setKeyword } from "../../redux/speaker/actions";
import { deleteData } from "../../utils/fetchData";

const Speaker = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const speaker = useSelector((state) => state.speaker);
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    let { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};
    if (!token) return navigate("/");
  }, []);

  useEffect(() => {
    dispatch(fetchSpeaker());
  }, [dispatch, speaker.keyword]);

  const handleDelete = async (id) => {
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
        await deleteData(`api/v1/speaker/destroy/${id}`);
        dispatch(setNotification(true, "success", "Berhasil hapus speaker!"));
        dispatch(fetchSpeaker());
      }
    });
  };

  return (
    <Container>
      <Button className="mb-2" action={() => navigate("/speaker/create")}>
        Tambah
      </Button>
      {notification.status && (
        <Alert
          type={notification.typeNotification}
          message={notification.message}
        />
      )}
      <SearchInput
        placeholder="Masukkan nama speaker"
        name="keyword"
        value={speaker.keyword}
        handleChange={(event) => dispatch(setKeyword(event.target.value))}
      />
      <TableWithAction
        status={speaker.status}
        thead={["Nama", "Avatar", "Role", "Aksi"]}
        data={speaker.data}
        tbody={["name", "avatar", "role"]}
        directoryImage="speaker"
        deleteAction={(id) => handleDelete(id)}
        editUrl={`/speaker/edit`}
      />
    </Container>
  );
};

export default Speaker;
