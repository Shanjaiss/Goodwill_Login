import React, { useEffect, useState } from "react";
import { QuickAuth } from "./QuickAuth";
import { useForm } from "antd/es/form/Form";
import { ForgotPasswordController } from "./ForgetPassword/ForgotPasswordController";
import { GetOtpController } from "./GetOtp/GetOtpController";
import { dispatcher } from "../../../service/FLCommonService";
import { message } from "antd";
import { useLocation, useOutletContext } from "react-router-dom";

export const QuickAuthController = () => {
  const [form] = useForm();
  const location = useLocation();
  // const [apiKey, setApiKey] = useState(null);
  // const [errorApiKeyMsg, setErrorApiKeyMsg] = useState(null);

  const [state, setState] = useState({
    getOtpModal: false,
    forgotPasswordModal: false,
    clientId: "",
    errorMsg: null,
    successMsg: null,
  });

  const { apiKey, errorApiKeyMsg, setErrorApiKeyMsg } = useOutletContext();

  useEffect(() => {
    // const queryParams = new URLSearchParams(location.search);
    // const key = queryParams.get("api_key");

    // if (key) {
    //   setApiKey(key);
    //   setErrorApiKeyMsg(null);
    // } else {
    //   setApiKey(null);
    //   setErrorApiKeyMsg("Invalid Request");
    // }

    const storedClientId = localStorage.getItem("clientId");
    if (storedClientId) {
      setState((prev) => ({ ...prev, clientId: storedClientId }));
      form.setFieldsValue({ clientId: storedClientId });
    }
  }, [location.search, form]);

  const handleSendOtpDirect = async (InTD) => {
    const payload = {
      api_key: apiKey,
      clnt_id: InTD.clientId,
      password: btoa(InTD.password),
      pan: "",
    };

    try {
      const response = await dispatcher("getotp", payload);
      if (response.status === "success") {
        setState((prev) => ({
          ...prev,
          successMsg: response.data?.ReqStatus || "OTP sent successfully",
        }));
      } else {
        setState((prev) => ({
          ...prev,
          errorMsg: response.error_msg || "Failed to send OTP",
        }));
      }
    } catch (err) {
      message.error("OTP request failed", err);
    }
  };

  const GetOtp = () => {
    const clientIdVal = form.getFieldValue("clientId");
    const passwordVal = form.getFieldValue("password");

    if (clientIdVal && passwordVal) {
      handleSendOtpDirect({ clientId: clientIdVal, password: passwordVal });
    } else {
      setState((prev) => ({ ...prev, getOtpModal: true }));
    }
  };

  const FormSubmit = async (InTD = null) => {
    if (errorApiKeyMsg) {
      console.error("API Key Error present.");
      return;
    }
    setState((prev) => ({ ...prev, errorMsg: null }));

    const clientIdVal = InTD?.clientId ?? form.getFieldValue("clientId");
    const passwordVal = InTD?.password ?? form.getFieldValue("password");
    const otpVal = InTD?.otp_totp ?? form.getFieldValue("otp_totp");

    const payload = {
      api_key: apiKey,
      clnt_id: clientIdVal,
      password: btoa(passwordVal),
      factor2: otpVal,
    };

    try {
      const responseData = await dispatcher("quickauth", payload);

      if (responseData.status === "success") {
        const redirectUrl = responseData.data?.ru;
        if (redirectUrl) {
          window.location.href = redirectUrl;
        } else {
          console.log("Redirect URL not found in response.");
        }
      } else {
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
      }));
    }

    if (clientIdVal) {
      localStorage.setItem("clientId", clientIdVal);
    }
  };

  const ForgotPassword = () => {
    setState((prev) => ({ ...prev, forgotPasswordModal: true }));
  };

  const ProcessTask = async (taskName, InTD = null) => {
    switch (taskName) {
      case "getOtp":
        GetOtp();
        break;
      case "submitForm":
        FormSubmit(InTD);
        break;
      case "openForgotPasswordModal":
        ForgotPassword();
        break;
      default:
        console.warn("Unknown task:", taskName);
    }
  };

  return (
    <>
      <QuickAuth
        setGoodwillOtpModal={(val) =>
          setState((prev) => ({ ...prev, getOtpModal: val }))
        }
        setForgotPasswordModal={(val) =>
          setState((prev) => ({ ...prev, forgotPasswordModal: val }))
        }
        clientId={state.clientId}
        setClientId={(val) => setState((prev) => ({ ...prev, clientId: val }))}
        ProcessTask={ProcessTask}
        form={form}
        errorMsg={state.errorMsg}
        setErrorMsg={(val) => setState((prev) => ({ ...prev, errorMsg: val }))}
        errorApiKeyMsg={errorApiKeyMsg}
        setErrorApiKeyMsg={setErrorApiKeyMsg}
        successMsg={state.successMsg}
        setSuccessMsg={(val) =>
          setState((prev) => ({ ...prev, successMsg: val }))
        }
      />

      <GetOtpController
        visible={state.getOtpModal}
        onClose={() => setState((prev) => ({ ...prev, getOtpModal: false }))}
        PubTD={{ clnt_id: state.clientId }}
        apiKey={apiKey}
      />

      <ForgotPasswordController
        visible={state.forgotPasswordModal}
        onClose={() =>
          setState((prev) => ({ ...prev, forgotPasswordModal: false }))
        }
        PubTD={{ clnt_id: state.clientId }}
        apiKey={apiKey}
      />
    </>
  );
};

export default QuickAuthController;
