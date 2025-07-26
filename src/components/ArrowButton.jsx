import React from "react";
import { Button } from "antd";

export const ArrowButton = ({
  label,
  onClick,
  type = "primary",
  danger = false,
  htmlType,
}) => {
  return (
    <Button type={type} danger={danger} onClick={onClick} htmlType={htmlType}>
      {label}
    </Button>
  );
};
