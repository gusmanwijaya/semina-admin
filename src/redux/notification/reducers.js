import { CLEAR_NOTIFICATION, SET_NOTIFICATION } from "./types";

let initialState = {
  status: false,
  typeNotification: "",
  message: "",
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION:
      return {
        ...state,
        status: action.status,
        typeNotification: action.typeNotification,
        message: action.message,
      };

    case CLEAR_NOTIFICATION:
      return {
        ...state,
        status: false,
        typeNotification: "",
        message: "",
      };

    default:
      return state;
  }
};

export default reducers;
