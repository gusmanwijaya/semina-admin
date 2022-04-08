import React from "react";
import { Table } from "react-bootstrap";
import Thead from "../Thead";
import TbodyWithAction from "../TbodyWithAction";

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
}) => {
  return (
    <Table striped bordered hover>
      <Thead text={thead} />
      <TbodyWithAction
        data={data}
        display={tbody}
        editUrl={editUrl}
        deleteAction={deleteAction}
        actionNotDisplay={actionNotDisplay}
        customAction={customAction}
      />
    </Table>
  );
};

export default TableWithAction;
