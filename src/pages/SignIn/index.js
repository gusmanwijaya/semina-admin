/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Form from "./form";
import { postData } from "../../utils/fetchData";
import Alert from "../../components/Alert";
import { useDispatch } from "react-redux";
import { userSignIn } from "../../redux/auth/actions";
import { setNotification } from "../../redux/notification/actions";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const notification = useSelector((state) => state.notification);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await postData(`api/v1/auth/user/sign-in`, form);
      const payload = jwtDecode(response?.data?.data?.token);
      dispatch(
        userSignIn(response?.data?.data?.token, payload?.role, payload?.name)
      );
      setIsLoading(false);
      navigate("/category");
    } catch (error) {
      dispatch(setNotification(true, "danger", error.response.data.message));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};
    if (token) return navigate(-1);
  }, []);

  return (
    <Container md={12} className="vh-100">
      {notification.status && (
        <Alert
          type={notification.typeNotification}
          message={notification.message}
        />
      )}
      <Card style={{ width: "50%" }} className="m-auto mt-5">
        <Card.Body>
          <Card.Title className="text-center">Form Sign In</Card.Title>
          <Form
            form={form}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SignIn;
