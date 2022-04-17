import {
  ERROR_FETCHING_SPEAKER,
  START_FETCHING_SPEAKER,
  SUCCESS_FETCHING_SPEAKER,
  SET_KEYWORD,
} from "./types";

const statusList = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  status: statusList.idle,
  data: [],
  keyword: "",
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case START_FETCHING_SPEAKER:
      return {
        ...state,
        status: statusList.process,
      };

    case ERROR_FETCHING_SPEAKER:
      return {
        ...state,
        status: statusList.error,
      };

    case SUCCESS_FETCHING_SPEAKER:
      return {
        ...state,
        status: statusList.success,
        data: action.speaker,
      };

    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.keyword,
      };

    default:
      return state;
  }
};

export default reducers;
