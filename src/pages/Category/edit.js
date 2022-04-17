/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import BreadCrumb from "../../components/BreadCrumb";
import Alert from "../../components/Alert";
import Form from "./form";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getData, putData } from "../../utils/fetchData";
import { useSelector } from "react-redux";
import { setNotification } from "../../redux/notification/actions";

const Edit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryId } = useParams();

  const [form, setForm] = useState({
    name: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const notification = useSelector((state) => state.notification);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const fetchOneCategory = async () => {
    const response = await getData(`api/v1/category/get-one/${categoryId}`);
    setForm({
      ...form,
      name: response?.data?.data?.name,
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await putData(`api/v1/category/update/${categoryId}`, form);
      dispatch(setNotification(true, "success", "Berhasil ubah kategori!"));
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

  useEffect(() => {
    fetchOneCategory();
  }, []);

  return (
    <Container>
      <BreadCrumb text={"Category"} urlText={"/category"} textSecond="Edit" />
      {notification.status && (
        <Alert
          type={notification.typeNotification}
          message={notification.message}
        />
      )}
      <Form
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        edit={true}
        isLoading={isLoading}
      />
    </Container>
  );
};

export default Edit;
