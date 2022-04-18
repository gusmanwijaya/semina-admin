/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import BreadCrumb from "../../components/BreadCrumb";
import Alert from "../../components/Alert";
import Form from "./form";
import { postData } from "../../utils/fetchData";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../redux/notification/actions";
import { fetchListCategory, fetchListSpeaker } from "../../redux/list/actions";

const EventCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const list = useSelector((state) => state.list);
  const notification = useSelector((state) => state.notification);

  const [form, setForm] = useState({
    title: "",
    price: "",
    date: "",
    file: "",
    cover: "",
    about: "",
    venueName: "",
    tagline: "",
    keyPoint: [""],
    category: "",
    speaker: "",
    stock: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};
    if (!token) return navigate("/");
  }, []);

  useEffect(() => {
    dispatch(fetchListSpeaker());
    dispatch(fetchListCategory());
  }, [dispatch]);

  const handleChange = (e) => {
    if (e.target.name === "cover") {
      if (
        e?.target?.files[0]?.type === "image/jpg" ||
        e?.target?.files[0]?.type === "image/png" ||
        e?.target?.files[0]?.type === "image/jpeg"
      ) {
        const size = parseFloat(e.target.files[0].size / 3145728).toFixed(2);

        if (size > 2) {
          setNotification(
            true,
            "danger",
            "Please select image size less than 3 MB"
          );
          setForm({
            ...form,
            file: "",
            [e.target.name]: "",
          });
        } else {
          setForm({
            ...form,
            file: e.target.files[0],
            [e.target.name]: URL.createObjectURL(e.target.files[0]),
          });
        }
      } else {
        setNotification(true, "danger", "type image png | jpg | jpeg");
        setForm({
          ...form,
          file: "",
          [e.target.name]: "",
        });
      }
    } else if (e.target.name === "category" || e.target.name === "speaker") {
      setForm({ ...form, [e.target.name]: e });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      let formData = new FormData();

      formData.append("cover", form.file);
      formData.append("title", form.title);
      formData.append("price", form.price);
      formData.append("date", form.date);
      formData.append("about", form.about);
      formData.append("venueName", form.venueName);
      formData.append("tagline", form.tagline);
      formData.append("keyPoint", JSON.stringify(form.keyPoint));
      formData.append("category", form.category?.value);
      formData.append("speaker", form.speaker?.value);
      formData.append("stock", form.stock);
      formData.append("status", true);

      const response = await postData("api/v1/event/create", formData, true);

      dispatch(
        setNotification(
          true,
          "success",
          `berhasil tambah event ${response.data.data.title}`
        )
      );
      navigate("/event");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      dispatch(setNotification(true, "danger", error.response.data.message));
    }
  };

  const handleChangeKeyPoint = (event, index) => {
    let _temp = [...form.keyPoint];

    _temp[index] = event.target.value;

    setForm({ ...form, keyPoint: _temp });
  };

  const handlePlusKeyPoint = () => {
    let _temp = [...form.keyPoint];
    _temp.push("");

    setForm({ ...form, keyPoint: _temp });
  };

  const handleMinusKeyPoint = (index) => {
    let _temp = [...form.keyPoint];
    let removeIndex = _temp
      .map(function (item, i) {
        return i;
      })
      .indexOf(index);

    _temp.splice(removeIndex, 1);
    setForm({ ...form, keyPoint: _temp });
  };

  return (
    <Container>
      <BreadCrumb text="Event" urlText="/event" textSecond="Create" />
      {notification.status && (
        <Alert
          type={notification.typeNotification}
          message={notification.message}
        />
      )}
      <Form
        form={form}
        isLoading={isLoading}
        list={list}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleChangeKeyPoint={handleChangeKeyPoint}
        handlePlusKeyPoint={handlePlusKeyPoint}
        handleMinusKeyPoint={handleMinusKeyPoint}
      />
    </Container>
  );
};

export default EventCreate;
