/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../components/Alert";
import BreadCrumb from "../../components/BreadCrumb";
import Form from "./form";
import { getData, putData } from "../../utils/fetchData";
import { config } from "../../configs";
import { setNotification } from "../../redux/notification/actions";

const SpeakerEdit = () => {
  const { speakerId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notification = useSelector((state) => state.notification);

  const [form, setForm] = useState({
    name: "",
    role: "",
    file: "",
    avatar: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchOneSpeaker = async () => {
    const response = await getData(`api/v1/speaker/get-one/${speakerId}`);
    setForm({
      ...form,
      name: response?.data?.data?.name,
      role: response?.data?.data?.role,
      avatar:
        response?.data?.data?.avatar === "images/avatar.png"
          ? `${config.API_HOST}/${response?.data?.data?.avatar}`
          : `${config.API_IMAGE}/speaker/${response?.data?.data?.avatar}`,
    });
  };

  useEffect(() => {
    let { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};
    if (!token) return navigate("/");
  }, []);

  useEffect(() => {
    fetchOneSpeaker();
  }, []);

  const handleChange = (event) => {
    if (event?.target?.name === "avatar") {
      if (
        event?.target?.files[0]?.type === "image/jpg" ||
        event?.target?.files[0]?.type === "image/png" ||
        event?.target?.files[0]?.type === "image/jpeg"
      ) {
        const size = parseFloat(
          event?.target?.files[0]?.size / 3145728
        ).toFixed(2);

        if (size > 2) {
          dispatch(
            setNotification(true, "danger", "Maksimal size file adalah 3 MB.")
          );
          setForm({
            ...form,
            file: "",
            [event?.target?.name]: "",
          });
        } else {
          setForm({
            ...form,
            file: event?.target?.files[0],
            [event?.target?.name]: URL.createObjectURL(event?.target?.files[0]),
          });
        }
      } else {
        dispatch(
          setNotification(
            true,
            "danger",
            "Format gambar yang didukung: png, jpg, atau jpeg."
          )
        );
        setForm({
          ...form,
          [event?.target?.name]: "",
          file: "",
        });
      }
    } else {
      setForm({
        ...form,
        [event?.target?.name]: event?.target?.value,
      });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      let formData = new FormData();

      formData.append("avatar", form.file);
      formData.append("name", form.name);
      formData.append("role", form.role);

      await putData(`api/v1/speaker/update/${speakerId}`, formData, true);

      dispatch(setNotification(true, "success", `berhasil ubah speaker`));
      setIsLoading(false);
      navigate("/speaker");
    } catch (error) {
      setIsLoading(false);
      dispatch(setNotification(true, "danger", error?.response?.data?.message));
    }
  };

  return (
    <Container>
      <BreadCrumb text={"Speaker"} urlText={"/speaker"} textSecond="Edit" />
      {notification.status && (
        <Alert
          type={notification.typeNotification}
          message={notification.message}
        />
      )}
      <Form
        form={form}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        edit
      />
    </Container>
  );
};

export default SpeakerEdit;
