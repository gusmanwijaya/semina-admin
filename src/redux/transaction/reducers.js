import {
  ERROR_FETCHING_TRANSACTION,
  SET_DATE,
  SET_EVENT,
  SET_KEYWORD,
  SET_PAGE,
  START_FETCHING_TRANSACTION,
  SUCCESS_FETCHING_TRANSACTION,
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
  event: "",
  page: 1,
  limit: 10,
  pages: 1,
  date: {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  },
  status: statuslist.idle,
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case START_FETCHING_TRANSACTION:
      return { ...state, status: statuslist.process };

    case ERROR_FETCHING_TRANSACTION:
      return { ...state, status: statuslist.error };

    case SUCCESS_FETCHING_TRANSACTION:
      return {
        ...state,
        status: statuslist.success,
        data: action.transaction,
        pages: action.pages,
      };

    case SET_KEYWORD:
      return {
        ...state,
        keyword: action.keyword,
      };

    case SET_PAGE:
      return {
        ...state,
        page: action.page,
      };

    case SET_EVENT:
      return {
        ...state,
        event: action.event,
      };

    case SET_DATE:
      return {
        ...state,
        date: action.range,
      };

    default:
      return state;
  }
};

export default reducers;
