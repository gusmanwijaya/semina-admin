import {
  ERROR_FETCHING_SPEAKER,
  START_FETCHING_SPEAKER,
  SUCCESS_FETCHING_SPEAKER,
  SET_KEYWORD,
} from "./types";

import { getData } from "../../utils/fetchData";
import debounce from "debounce-promise";
import { clearNotification } from "../notification/actions";

let debouncedFetchSpeaker = debounce(getData, 1000);

const startFetchingSpeaker = () => {
  return {
    type: START_FETCHING_SPEAKER,
  };
};

const errorFetchingSpeaker = () => {
  return {
    type: ERROR_FETCHING_SPEAKER,
  };
};

const successFetchingSpeaker = ({ speaker }) => {
  return {
    type: SUCCESS_FETCHING_SPEAKER,
    speaker,
  };
};

const fetchSpeaker = () => async (dispatch, getState) => {
  dispatch(startFetchingSpeaker());

  try {
    setTimeout(() => {
      dispatch(clearNotification());
    }, 3000);

    let params = {
      keyword: getState().speaker.keyword,
    };

    let response = await debouncedFetchSpeaker(
      `api/v1/speaker/get-all`,
      params
    );

    dispatch(
      successFetchingSpeaker({
        speaker: response?.data?.data,
      })
    );
  } catch (error) {
    dispatch(errorFetchingSpeaker());
  }
};

const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};

export {
  fetchSpeaker,
  startFetchingSpeaker,
  errorFetchingSpeaker,
  successFetchingSpeaker,
  setKeyword,
};
