import { USER_SIGNIN, USER_SIGNOUT } from "./types";

let initialState = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : { token: null, role: null, username: null };

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGNIN:
      return {
        ...state,
        token: action.token,
        role: action.role,
        username: action.username,
      };

    case USER_SIGNOUT:
      return {
        token: null,
        role: null,
        username: null,
      };

    default:
      return state;
  }
};

export default reducers;
