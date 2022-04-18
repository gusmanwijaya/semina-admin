import {
  ERROR_FETCHING_LIST_CATEGORY,
  ERROR_FETCHING_LIST_SPEAKER,
  START_FETCHING_LIST_CATEGORY,
  START_FETCHING_LIST_SPEAKER,
  SUCCESS_FETCHING_LIST_CATEGORY,
  SUCCESS_FETCHING_LIST_SPEAKER,
  ERROR_FETCHING_LIST_EVENT,
  START_FETCHING_LIST_EVENT,
  SUCCESS_FETCHING_LIST_EVENT,
} from "./types";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  category: [],
  statusCategory: statuslist.idle,
  speaker: [],
  statusSpeaker: statuslist.idle,
  event: [],
  statusEvent: statuslist.idle,
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case START_FETCHING_LIST_CATEGORY:
      return { ...state, statusCategory: statuslist.process };

    case ERROR_FETCHING_LIST_CATEGORY:
      return { ...state, statusCategory: statuslist.error };

    case SUCCESS_FETCHING_LIST_CATEGORY:
      return {
        ...state,
        statusCategory: statuslist.success,
        category: action.category,
      };

    case START_FETCHING_LIST_SPEAKER:
      return { ...state, statusSpeaker: statuslist.process };

    case ERROR_FETCHING_LIST_SPEAKER:
      return { ...state, statusSpeaker: statuslist.error };

    case SUCCESS_FETCHING_LIST_SPEAKER:
      return {
        ...state,
        statusSpeaker: statuslist.success,
        speaker: action.speaker,
      };

    case START_FETCHING_LIST_EVENT:
      return { ...state, statusEvent: statuslist.process };

    case ERROR_FETCHING_LIST_EVENT:
      return { ...state, statusEvent: statuslist.error };

    case SUCCESS_FETCHING_LIST_EVENT:
      return {
        ...state,
        statusEvent: statuslist.success,
        event: action.event,
      };

    default:
      return state;
  }
};

export default reducers;
