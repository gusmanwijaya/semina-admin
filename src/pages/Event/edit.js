/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import BreadCrumb from "../../components/BreadCrumb";
import Alert from "../../components/Alert";
import Form from "./form";
import { getData, putData } from "../../utils/fetchData";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../../redux/notification/actions";
import { fetchListCategory, fetchListSpeaker } from "../../redux/list/actions";
import moment from "moment";
import { config } from "../../configs";

const EventEdit = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const list = useSelector((state) => state.list);
  const notification = useSelector((state) => state.notification);

  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    fetchOneEvent();
  }, []);

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

  const fetchOneEvent = async () => {
    let response = await getData(`api/v1/event/get-one/${eventId}`);

    setForm({
      ...form,
      title: response.data.data.title,
      price: response.data.data.price,
      date: moment(response.data.data.date).format("YYYY-MM-DDTHH:SS"),
      file: `${config.API_IMAGE}/event/${response.data.data.cover}`,
      cover: `${config.API_IMAGE}/event/${response.data.data.cover}`,
      about: response.data.data.about,
      venueName: response.data.data.venueName,
      tagline: response.data.data.tagline,
      keyPoint: response.data.data.keyPoint,
      category: {
        label: response?.data?.data?.category?.name,
        target: {
          name: "category",
          value: response?.data?.data?.category?._id,
        },
        value: response?.data?.data?.category?._id,
      },
      speaker: {
        label: response?.data?.data?.speaker?.name,
        target: {
          name: "speaker",
          value: response?.data?.data?.speaker?._id,
        },
        value: response?.data?.data?.speaker?._id,
      },
      stock: response.data.data.stock,
    });
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
      formData.append("category", form.category.value);
      formData.append("speaker", form.speaker.value);
      formData.append("stock", form.stock);
      formData.append("status", true);

      const response = await putData(
        `api/v1/event/update/${eventId}`,
        formData,
        true
      );

      dispatch(
        setNotification(
          true,
          "success",
          `berhasil ubah event ${response.data.data.title}`
        )
      );
      navigate("/event");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      dispatch(setNotification(true, "danger", error.response.data.message));
    }
  };

  return (
    <Container>
      <BreadCrumb text={"Event"} urlText={"/event"} textSecond="Edit" />
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

export default EventEdit;
