import React, { useEffect, useState } from "react";
import { GetOtp } from "./GetOtp";
import { useForm } from "antd/es/form/Form";
import { dispatcher } from "../../../../service/FLCommonService";

export const GetOtpController = ({ visible, onClose, PubTD, apiKey }) => {
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
    const panVal = InTD?.otp_totp ?? form.getFieldValue("pan");

    const payload = {
      api_key: apiKey,
      clnt_id: clientIdVal,
      pan: panVal,
      password: "",
    };

    try {
      const responseData = await dispatcher("getotp", payload);

      console.log("API Response:", responseData);

      if (responseData.status === "success") {
        setState((prev) => ({
          ...prev,
          successMsg: responseData.data?.ReqStatus || "Success",
          errorMsg: null,
        }));
      } else if (responseData.status === "error") {
        setState((prev) => ({
          ...prev,
          errorMsg: responseData.error_msg || "Something went wrong",
          successMsg: null,
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
    <GetOtp
      visible={visible}
      onClose={onClose}
      form={form}
      SubTD={SubTD}
      errorMsg={state.errorMsg}
      setErrorMsg={(val) => setState((prev) => ({ ...prev, errorMsg: val }))}
      successMsg={state.successMsg}
      setSuccessMsg={(val) =>
        setState((prev) => ({ ...prev, successMsg: val }))
      }
      ProcessTask={ProcessTask}
    />
  );
};
