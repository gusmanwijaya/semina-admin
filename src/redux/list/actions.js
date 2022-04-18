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

import { getData } from "../../utils/fetchData";
import debounce from "debounce-promise";

let debouncedFetchListCategory = debounce(getData, 1000);
let debouncedFetchListSpeaker = debounce(getData, 1000);
let debouncedFetchListEvent = debounce(getData, 1000);

const startFetchingListCategory = () => {
  return {
    type: START_FETCHING_LIST_CATEGORY,
  };
};

const successFetchingListCategory = ({ category }) => {
  return {
    type: SUCCESS_FETCHING_LIST_CATEGORY,
    category,
  };
};

const errorFetchingListCategory = () => {
  return {
    type: ERROR_FETCHING_LIST_CATEGORY,
  };
};

const fetchListCategory = () => {
  return async (dispatch) => {
    dispatch(startFetchingListCategory());

    try {
      let response = await debouncedFetchListCategory(
        "api/v1/category/get-all"
      );

      let _temp = [];

      response.data.data.forEach((res) => {
        _temp.push({
          value: res._id,
          label: res.name,
          target: {
            value: res._id,
            name: "category",
          },
        });
      });

      dispatch(
        successFetchingListCategory({
          category: _temp,
        })
      );
    } catch (error) {
      dispatch(errorFetchingListCategory());
    }
  };
};

// redux list speaker
const startFetchingListSpeaker = () => {
  return {
    type: START_FETCHING_LIST_SPEAKER,
  };
};

const successFetchingListSpeaker = ({ speaker }) => {
  return {
    type: SUCCESS_FETCHING_LIST_SPEAKER,
    speaker,
  };
};

const errorFetchingListSpeaker = () => {
  return {
    type: ERROR_FETCHING_LIST_SPEAKER,
  };
};

const fetchListSpeaker = () => {
  return async (dispatch) => {
    dispatch(startFetchingListSpeaker());

    try {
      let response = await debouncedFetchListSpeaker("api/v1/speaker/get-all");

      let _temp = [];

      response.data.data.forEach((res) => {
        _temp.push({
          value: res._id,
          label: res.name,
          target: {
            value: res._id,
            name: "speaker",
          },
        });
      });

      dispatch(
        successFetchingListSpeaker({
          speaker: _temp,
        })
      );
    } catch (error) {
      dispatch(errorFetchingListSpeaker());
    }
  };
};

const startFetchingListEvent = () => {
  return {
    type: START_FETCHING_LIST_EVENT,
  };
};

const successFetchingListEvent = ({ event }) => {
  return {
    type: SUCCESS_FETCHING_LIST_EVENT,
    event,
  };
};

const errorFetchingListEvent = () => {
  return {
    type: ERROR_FETCHING_LIST_EVENT,
  };
};

const fetchListEvent = () => async (dispatch) => {
  dispatch(startFetchingListEvent());

  try {
    let response = await debouncedFetchListEvent("api/v1/event/get-all");

    let _temp = [];

    response.data.data.forEach((res) => {
      _temp.push({
        value: res._id,
        label: res.title,
        target: {
          value: res._id,
          name: "event",
        },
      });
    });

    dispatch(
      successFetchingListEvent({
        event: _temp,
      })
    );
  } catch (error) {
    dispatch(errorFetchingListEvent());
  }
};

export {
  startFetchingListCategory,
  successFetchingListCategory,
  errorFetchingListCategory,
  fetchListCategory,
  startFetchingListSpeaker,
  successFetchingListSpeaker,
  errorFetchingListSpeaker,
  fetchListSpeaker,
  startFetchingListEvent,
  successFetchingListEvent,
  errorFetchingListEvent,
  fetchListEvent,
};
