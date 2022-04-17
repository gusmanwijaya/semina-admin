import {
  ERROR_FETCHING_EVENT,
  SET_CATEGORY,
  SET_KEYWORD,
  SET_SPEAKER,
  START_FETCHING_EVENT,
  SUCCESS_FETCHING_EVENT,
} from "./types";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  data: [],
  keyword: "",
  speaker: "",
  category: "",
  status: statuslist.idle,
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case START_FETCHING_EVENT:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_EVENT:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_EVENT:
      return {
        ...state,
        status: statuslist.success,
        data: action.event,
      };

    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.keyword,
      };

    case SET_CATEGORY:
      return {
        ...state,
        category: action.category,
      };

    case SET_SPEAKER:
      return {
        ...state,
        speaker: action.speaker,
      };

    default:
      return state;
  }
};

export default reducers;
