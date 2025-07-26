import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { ChangePassword } from "./ChangePassword";
import { message } from "antd";
import { dispatcher } from "../../../service/FLCommonService";
import { useForm } from "antd/es/form/Form";

export const ChangePasswordController = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState(null);

  const { apiKey, errorApiKeyMsg, setErrorApiKeyMsg } = useOutletContext();

  useEffect(() => {
    const storedClientId = localStorage.getItem("clientId");
    if (storedClientId) {
      form.setFieldsValue({ clientId: storedClientId });
    }
  }, [form]);

  // Handle form submission
  const FormSubmit = async (InTD) => {
    if (errorApiKeyMsg) {
      console.error("API Key Error present. ");
      return;
    }
    setErrorMsg(null);

    const clientIdVal = InTD?.clientId ?? form.getFieldValue("clientId");
    const oldPasswordVal = InTD?.password ?? form.getFieldValue("oldPassword");
    const newPasswordVal = InTD?.password ?? form.getFieldValue("newPassword");

    const payload = {
      api_key: apiKey,
      clnt_id: clientIdVal,
      oldpwd: btoa(oldPasswordVal),
      pwd: btoa(newPasswordVal),
    };

    try {
      const responseData = await dispatcher("changepwd", payload);

      if (responseData.status === "success") {
        const successText =
          responseData.data?.dmsg || "Password changed successfully";

        // Show AntD message with duration and then redirect
        message.success(successText, 10, () => {
          navigate(`/login?api_key=${apiKey}`);
        });
      } else if (responseData.status === "error") {
        setErrorMsg(responseData.error_msg || "Something went wrong");
      }
    } catch (error) {
      console.error("API call failed:", error);
      setErrorMsg(
        error?.response?.statusText || "Request failed. Please try again."
      );
    }
  };

  const ProcessTask = async (taskName, InTD = null) => {
    switch (taskName) {
      case "submitForm":
        FormSubmit(InTD);
        break;

      default:
        console.warn("Unknown task:", taskName);
    }
  };

  return (
    <ChangePassword
      apiKey={apiKey}
      ProcessTask={ProcessTask}
      navigate={navigate}
      errorMsg={errorMsg}
      setErrorMsg={setErrorMsg}
      errorApiKeyMsg={errorApiKeyMsg}
      setErrorApiKeyMsg={setErrorApiKeyMsg}
      form={form}
    />
  );
};

export default ChangePasswordController;
