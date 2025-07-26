import React, { useState, useEffect } from "react";
import { ForgotPassword } from "./ForgotPassword";
import { dispatcher } from "../../../../service/FLCommonService";
import { useForm } from "antd/es/form/Form";

export const ForgotPasswordController = ({
  visible,
  onClose,
  PubTD,
  apiKey,
}) => {
  const [form] = useForm();

  const [state, setState] = useState({
    errorMsg: null,
    successMsg: null,
  });

  const SubTD = PubTD?.clnt_id;

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        clientId: SubTD,
      });
    } else {
      form.resetFields();
    }
  }, [visible, SubTD, form]);

  const FormSubmit = async (InTD) => {
    const clientIdVal = InTD?.clientId ?? form.getFieldValue("clientId");
    const panVal = InTD?.password ?? form.getFieldValue("pan");
    const dobVal = InTD?.otp_totp ?? form.getFieldValue("dob");

    const payload = {
      api_key: apiKey,
      clnt_id: clientIdVal,
      pan: panVal,
      dob: dobVal,
    };

    try {
      const responseData = await dispatcher("forgotpassword", payload);

      if (responseData.status === "success") {
        const dmsg = responseData.data?.dmsg || "";

        setState((prev) => ({
          ...prev,
          successMsg: dmsg,
        }));
      } else if (responseData.status === "error") {
        setState((prev) => ({
          ...prev,
          errorMsg: responseData.error_msg || "Something went wrong",
        }));
      }
    } catch (error) {
      console.error("API call failed:", error);
      setState((prev) => ({
        ...prev,
        errorMsg:
          error?.response?.statusText || "Request failed. Please try again.",
        successMsg: null,
      }));
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
    <ForgotPassword
      visible={visible}
      onClose={onClose}
      SubTD={SubTD}
      errorMsg={state.errorMsg}
      setErrorMsg={(val) => setState((prev) => ({ ...prev, errorMsg: val }))}
      successMsg={state.successMsg}
      setSuccessMsg={(val) =>
        setState((prev) => ({ ...prev, successMsg: val }))
      }
      ProcessTask={ProcessTask}
      form={form}
    />
  );
};
