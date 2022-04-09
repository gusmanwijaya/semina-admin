import {
  ERROR_FETCHING_CATEGORY,
  START_FETCHING_CATEGORY,
  SUCCESS_FETCHING_CATEGORY,
} from "./types";

const statusList = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  data: [],
  status: statusList.idle,
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case START_FETCHING_CATEGORY:
      return {
        ...state,
        status: statusList.process,
      };

    case ERROR_FETCHING_CATEGORY:
      return {
        ...state,
        status: statusList.error,
      };

    case SUCCESS_FETCHING_CATEGORY:
      return {
        ...state,
        status: statusList.success,
        data: action.category,
      };

    default:
      return state;
  }
};

export default reducers;
