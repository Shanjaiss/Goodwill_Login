import React from "react";
import { Alert } from "antd";

export const ArrowAlert = ({ type, description, onClose }) => {
  if (!description) return null;

  let alertClass = "";
  if (type === "success") alertClass = "alert-successMsg";
  else if (type === "error") alertClass = "alert-errorMsg";
  else if (type === "info") alertClass = "alert-infoMsg";
  else if (type === "warning") alertClass = "alert-warningMsg";

  return (
    <Alert
      description={description}
      type={type}
      showIcon
      closable
      onClose={onClose}
      className={alertClass}
    />
  );
};
