/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Table from "../../components/TableWithAction";
import SearchInput from "../../components/SearchInput";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTransaction,
  setKeyword,
  setPage,
  setEvent,
  setDate,
} from "../../redux/transaction/actions";
import Alert from "../../components/Alert";
import SelectBox from "../../components/SelectBox";
import { fetchListEvent } from "../../redux/list/actions";
import DateRange from "../../components/InputDate";
import { formatDate } from "../../utils/formatDate";

const Transaction = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notification = useSelector((state) => state.notification);
  const transaction = useSelector((state) => state.transaction);
  const list = useSelector((state) => state.list);

  const [isShowed, setIsShowed] = useState(false);

  useEffect(() => {
    let { token } = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : {};
    if (!token) return navigate("/");
  }, []);

  useEffect(() => {
    dispatch(fetchTransaction());
  }, [
    dispatch,
    transaction.keyword,
    transaction.page,
    transaction.event,
    transaction.date,
  ]);

  useEffect(() => {
    dispatch(fetchListEvent());
  }, [dispatch]);

  const displayDate = `${
    transaction.date?.startDate ? formatDate(transaction.date?.startDate) : ""
  }${
    transaction.date?.endDate
      ? " - " + formatDate(transaction.date.endDate)
      : ""
  }`;

  return (
    <Container>
      <Row>
        <Col>
          <SearchInput
            name="keyword"
            value={transaction.keyword}
            placeholder="Masukkan pencarian"
            handleChange={(e) => dispatch(setKeyword(e.target.value))}
          />
        </Col>
        <Col>
          <SelectBox
            placeholder={"Masukan pencarian event"}
            name="event"
            value={transaction.event}
            options={list.event}
            isClearable={true}
            handleChange={(e) => dispatch(setEvent(e))}
          />
        </Col>
        <Col
          className="cursor-pointer position-relative"
          onClick={() => setIsShowed(true)}
        >
          <SearchInput disabled value={displayDate} />
          {isShowed ? (
            <DateRange
              date={transaction.date}
              setIsShowed={() => setIsShowed(!isShowed)}
              onChangeDate={(ranges) => dispatch(setDate(ranges.selection))}
            />
          ) : (
            ""
          )}
        </Col>
      </Row>

      {notification.status && (
        <Alert
          type={notification.typeNotification}
          message={notification.message}
        />
      )}
      <Table
        status={transaction.status}
        thead={["Nama", "Email", "Judul", "Tanggal", "Tempat"]}
        data={transaction.data}
        tbody={["name", "email", "title", "date", "venueName"]}
        pages={transaction.pages}
        actionNotDisplay
        handlePageClick={({ selected }) => dispatch(setPage(selected + 1))}
      />
    </Container>
  );
};

export default Transaction;
