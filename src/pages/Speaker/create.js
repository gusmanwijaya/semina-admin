import React from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alert";
import BreadCrumb from "../../components/BreadCrumb";
import { setNotification } from "../../redux/notification/actions";
import { postData } from "../../utils/fetchData";
import Form from "./form";

const SpeakerCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notification = useSelector((state) => state.notification);

  const [form, setForm] = useState({
    name: "",
    role: "",
    avatar: "",
    file: "",
  });

  const [isLoading, setIsLoading] = useState(false);

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

      const response = await postData(`api/v1/speaker/create`, formData, true);

      dispatch(
        setNotification(
          true,
          "success",
          `berhasil tambah speaker ${response.data.data.name}`
        )
      );
      navigate("/speaker");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      dispatch(setNotification(true, "danger", error.response.data.message));
    }
  };

  return (
    <Container>
      <BreadCrumb text={"Speaker"} urlText={"/speaker"} textSecond="Create" />
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
      />
    </Container>
  );
};

export default SpeakerCreate;
