import { CLEAR_NOTIFICATION, SET_NOTIFICATION } from "./types";

const setNotification = (status, typeNotification, message) => {
  return {
    type: SET_NOTIFICATION,
    status,
    typeNotification,
    message,
  };
};

const clearNotification = () => {
  return {
    type: CLEAR_NOTIFICATION,
  };
};

export { setNotification, clearNotification };
