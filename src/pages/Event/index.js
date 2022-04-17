/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Alert from "../../components/Alert";
import Button from "../../components/Button";
import SearchInput from "../../components/SearchInput";
import SelectBox from "../../components/SelectBox";
import TableWithAction from "../../components/TableWithAction";
import {
  fetchEvent,
  setKeyword,
  setCategory,
  setSpeaker,
} from "../../redux/event/actions";
import { fetchListCategory, fetchListSpeaker } from "../../redux/list/actions";
import { setNotification } from "../../redux/notification/actions";
import { deleteData } from "../../utils/fetchData";

const Event = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const event = useSelector((state) => state.event);
  const notification = useSelector((state) => state.notification);
  const list = useSelector((state) => state.list);

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
        await deleteData(`api/v1/event/destroy/${id}`);
        dispatch(setNotification(true, "success", "Berhasil hapus event!"));
        dispatch(fetchEvent());
      }
    });
  };

  useEffect(() => {
    let { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};
    if (!token) return navigate("/");
  }, []);

  useEffect(() => {
    dispatch(fetchEvent());
  }, [dispatch, event.keyword, event.category, event.speaker]);

  useEffect(() => {
    dispatch(fetchListSpeaker());
    dispatch(fetchListCategory());
  }, [dispatch]);

  return (
    <Container>
      <Button className="mb-2" action={() => navigate("/event/create")}>
        Tambah
      </Button>
      <Row>
        <Col>
          <SearchInput
            placeholder="Masukkan nama event"
            name="keyword"
            value={event.keyword}
            handleChange={(event) => dispatch(setKeyword(event?.target?.value))}
          />
        </Col>
        <Col>
          <SelectBox
            placeholder={"Masukkan pencarian kategori"}
            name="category"
            value={event.category}
            options={list.category}
            isClearable={true}
            handleChange={(event) => dispatch(setCategory(event))}
          />
        </Col>
        <Col>
          <SelectBox
            placeholder={"Masukkan pencarian speaker"}
            name="speaker"
            value={event.speaker}
            options={list.speaker}
            isClearable={true}
            handleChange={(event) => dispatch(setSpeaker(event))}
          />
        </Col>
      </Row>

      {notification.status && (
        <Alert
          type={notification.typeNotification}
          message={notification.message}
        />
      )}
      <TableWithAction
        status={event.status}
        thead={[
          "Judul",
          "Harga",
          "Tanggal",
          "Tempat",
          "Kategori",
          "Speaker",
          "Aksi",
        ]}
        data={event.data}
        tbody={[
          "title",
          "price",
          "date",
          "venueName",
          "categoryName",
          "speakerName",
        ]}
        editUrl={`/event/edit`}
        deleteAction={(id) => handleDelete(id)}
      />
    </Container>
  );
};

export default Event;
