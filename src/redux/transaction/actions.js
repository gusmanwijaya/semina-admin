import {
  ERROR_FETCHING_TRANSACTION,
  SET_DATE,
  SET_EVENT,
  SET_KEYWORD,
  SET_PAGE,
  START_FETCHING_TRANSACTION,
  SUCCESS_FETCHING_TRANSACTION,
} from "./types";

import { getData } from "../../utils/fetchData";
import debounce from "debounce-promise";
import { clearNotification } from "../notification/actions";
import moment from "moment";

let debouncedFetchTransaction = debounce(getData, 1000);

const startFetchingTransaction = () => {
  return {
    type: START_FETCHING_TRANSACTION,
  };
};

const successFetchingTransaction = ({ transaction, pages }) => {
  return {
    type: SUCCESS_FETCHING_TRANSACTION,
    transaction,
    pages,
  };
};

const errorFetchingTransaction = () => {
  return {
    type: ERROR_FETCHING_TRANSACTION,
  };
};

const fetchTransaction = () => {
  return async (dispatch, getState) => {
    dispatch(startFetchingTransaction());

    try {
      setTimeout(() => {
        dispatch(clearNotification());
      }, 3000);

      let params = {
        keyword: getState().transaction.keyword,
        event: getState()?.transaction?.event?.value || "",
        page: getState().transaction?.page || 1,
        limit: getState().transaction?.limit || 10,
        startDate: moment(getState().transaction?.date?.startDate).format(
          "YYYY-MM-DD"
        ),
        endDate: moment(getState().transaction?.date?.endDate).format(
          "YYYY-MM-DD"
        ),
      };

      let response = await debouncedFetchTransaction(
        "api/v1/transaction/get-all",
        params
      );

      let _temp = [];
      response.data.data.forEach((res) => {
        _temp.push({
          name: `${res.personalDetail.firstName} ${res.personalDetail.lastName}`,
          email: res.personalDetail.email,
          title: res.historyEvent.title,
          date: res.historyEvent.date,
          venueName: res.historyEvent.venueName,
        });
      });

      dispatch(
        successFetchingTransaction({
          transaction: _temp,
          pages: response.data.total_page,
        })
      );
    } catch (error) {
      dispatch(errorFetchingTransaction());
    }
  };
};

const setKeyword = (keyword) => {
  return {
    type: SET_KEYWORD,
    keyword,
  };
};

const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};

const setDate = (range) => {
  return {
    type: SET_DATE,
    range,
  };
};

const setEvent = (event) => {
  return {
    type: SET_EVENT,
    event,
  };
};

export {
  startFetchingTransaction,
  errorFetchingTransaction,
  successFetchingTransaction,
  fetchTransaction,
  setKeyword,
  setPage,
  setDate,
  setEvent,
};
