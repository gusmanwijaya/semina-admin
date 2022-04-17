import {
  ERROR_FETCHING_EVENT,
  SET_CATEGORY,
  SET_KEYWORD,
  SET_SPEAKER,
  START_FETCHING_EVENT,
  SUCCESS_FETCHING_EVENT,
} from "./types";

import { getData } from "../../utils/fetchData";
import debounce from "debounce-promise";
import { clearNotification } from "../notification/actions";

let debouncedFetchEvent = debounce(getData, 1000);

const startFetchingEvent = () => {
  return {
    type: START_FETCHING_EVENT,
  };
};

const successFetchingEvent = ({ event }) => {
  return {
    type: SUCCESS_FETCHING_EVENT,
    event,
  };
};

const errorFetchingEvent = () => {
  return {
    type: ERROR_FETCHING_EVENT,
  };
};

const fetchEvent = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingEvent());

    try {
      setTimeout(() => {
        dispatch(clearNotification());
      }, 3000);

      let params = {
        keyword: getState().event?.keyword,
        category: getState().event?.category?.value || "",
        speaker: getState().event?.speaker?.value || "",
      };

      let response = await debouncedFetchEvent("api/v1/event/get-all", params);

      response.data.data.forEach((res) => {
        res.categoryName = res?.category?.name ?? "";
        res.speakerName = res?.speaker?.name ?? "-";
      });

      dispatch(
        successFetchingEvent({
          event: response.data.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingEvent());
    }
  };
};

const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};

const setCategory = (category) => {
  return {
    type: SET_CATEGORY,
    category,
  };
};

const setSpeaker = (speaker) => {
  return {
    type: SET_SPEAKER,
    speaker,
  };
};

export {
  startFetchingEvent,
  successFetchingEvent,
  errorFetchingEvent,
  fetchEvent,
  setKeyword,
  setCategory,
  setSpeaker,
};
