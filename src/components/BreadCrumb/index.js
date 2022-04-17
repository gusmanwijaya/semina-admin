import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ComponentBreadCrumb = ({ text, textSecond, urlText }) => {
  const navigate = useNavigate();

  return (
    <Breadcrumb className="my-2">
      {!textSecond && <Breadcrumb.Item active>{text}</Breadcrumb.Item>}
      {textSecond && (
        <Breadcrumb.Item onClick={() => navigate(urlText)}>
          {text}
        </Breadcrumb.Item>
      )}
      {textSecond && <Breadcrumb.Item active>{textSecond}</Breadcrumb.Item>}
    </Breadcrumb>
  );
};

export default ComponentBreadCrumb;
