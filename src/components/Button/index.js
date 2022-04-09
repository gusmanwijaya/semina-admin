import React from "react";
import { Button } from "react-bootstrap";

const ComponentButton = ({
  children,
  action,
  variant,
  size,
  loading,
  disabled,
  className,
}) => {
  return (
    <Button
      className={className}
      variant={variant}
      size={size}
      disabled={disabled}
      onClick={action}
    >
      {loading ? "Loading..." : children}
    </Button>
  );
};

export default ComponentButton;
