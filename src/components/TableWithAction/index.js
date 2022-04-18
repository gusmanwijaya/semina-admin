import React from "react";
import { Table } from "react-bootstrap";
import Thead from "../Thead";
import TbodyWithAction from "../TbodyWithAction";
import Pagination from "../Pagination";

const TableWithAction = ({
  withoutPagination,
  actionNotDisplay,
  handlePageClick,
  data,
  thead,
  tbody,
  editUrl,
  deleteAction,
  pages,
  customAction,
  status,
  directoryImage,
}) => {
  return (
    <>
      <Table striped bordered hover>
        <Thead text={thead} />
        <TbodyWithAction
          data={data}
          display={tbody}
          editUrl={editUrl}
          deleteAction={deleteAction}
          actionNotDisplay={actionNotDisplay}
          customAction={customAction}
          status={status}
          directoryImage={directoryImage}
        />
      </Table>
      {!withoutPagination && data.length ? (
        <Pagination pages={pages} handlePageClick={handlePageClick} />
      ) : (
        ""
      )}
    </>
  );
};

export default TableWithAction;
