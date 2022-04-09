import {
  ERROR_FETCHING_CATEGORY,
  START_FETCHING_CATEGORY,
  SUCCESS_FETCHING_CATEGORY,
} from "./types";
import { getData } from "../../utils/fetchData";
import debounce from "debounce-promise";
import { clearNotification } from "../notification/actions";

let debouncedFetchCategory = debounce(getData, 1000);

const startFetchingCategory = () => {
  return {
    type: START_FETCHING_CATEGORY,
  };
};

const successFetchingCategory = ({ category }) => {
  return {
    type: SUCCESS_FETCHING_CATEGORY,
    category,
  };
};

const errorFetchingCategory = () => {
  return {
    type: ERROR_FETCHING_CATEGORY,
  };
};

const fetchCategory = () => {
  return async (dispatch) => {
    dispatch(startFetchingCategory());

    try {
      setTimeout(() => {
        dispatch(clearNotification());
      }, 3000);

      let response = await debouncedFetchCategory(`api/v1/category/get-all`);
      dispatch(
        successFetchingCategory({
          category: response?.data?.data,
        })
      );
    } catch (error) {
      dispatch(errorFetchingCategory());
    }
  };
};

export {
  startFetchingCategory,
  successFetchingCategory,
  errorFetchingCategory,
  fetchCategory,
};
