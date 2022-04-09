import axios from "axios";
import { config } from "../configs";

const getData = async (url, params) => {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios.get(`${config.API_HOST}/${url}`, {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const postData = async (url, payload) => {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios.post(`${config.API_HOST}/${url}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const putData = async (url, payload) => {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios.put(`${config.API_HOST}/${url}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const patchData = async (url, payload) => {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios.patch(`${config.API_HOST}/${url}`, payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteData = async (url) => {
  let { token } = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {};

  return await axios.delete(`${config.API_HOST}/${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export { getData, postData, putData, patchData, deleteData };
