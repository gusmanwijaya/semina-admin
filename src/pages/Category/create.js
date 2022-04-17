/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import BreadCrumb from "../../components/BreadCrumb";
import Alert from "../../components/Alert";
import Form from "./form";
import { postData } from "../../utils/fetchData";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setNotification } from "../../redux/notification/actions";
import { useSelector } from "react-redux";

const Create = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notification = useSelector((state) => state.notification);

  const [form, setForm] = useState({
    name: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await postData("api/v1/category/create", form);
      dispatch(
        setNotification(
          true,
          "success",
          `Berhasil tambah kategori ${response?.data?.data?.name}`
        )
      );
      navigate("/category");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      dispatch(setNotification(true, "danger", error.response.data.message));
    }
  };

  useEffect(() => {
    let { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};
    if (!token) return navigate("/");
  }, []);

  return (
    <Container>
      <BreadCrumb text={"Category"} urlText={"/category"} textSecond="Create" />
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

export default Create;
