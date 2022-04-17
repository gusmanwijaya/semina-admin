import { USER_SIGNIN, USER_SIGNOUT } from "./types";

const userSignIn = (token, role, username) => {
  return {
    type: USER_SIGNIN,
    token,
    role,
    username,
  };
};

const userSignOut = () => {
  return {
    type: USER_SIGNOUT,
  };
};

export { userSignIn, userSignOut };
