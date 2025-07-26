import React from "react";
import { Row, Col, Form, Typography, Alert, Button } from "antd";
import "../../../assets/css/main.css";
import ArrowInput from "../../../components/ArrowInput";
import { ArrowButton } from "../../../components/ArrowButton";
import { ArrowAlert } from "../../../components/ArrowAlert";

const { Link } = Typography;

export const QuickAuth = ({
  clientId,
  setClientId,
  form,
  errorMsg,
  setErrorMsg,
  errorApiKeyMsg,
  setErrorApiKeyMsg,
  successMsg,
  setSuccessMsg,
  ProcessTask,
}) => {
  return (
    <>
      {(errorApiKeyMsg || errorMsg) && (
        <ArrowAlert
          description={errorApiKeyMsg || errorMsg}
          type="error"
          onClose={() => {
            errorApiKeyMsg ? setErrorApiKeyMsg(null) : setErrorMsg(null);
          }}
        />
      )}

      {successMsg && (
        <ArrowAlert
          description={successMsg}
          type="success"
          onClose={() => setSuccessMsg(null)}
        />
      )}

      {/* Form */}
      <Form
        form={form}
        layout="vertical"
        onFinish={() => ProcessTask("submitForm")}
      >
        <ArrowInput
          name="clientId"
          type="text"
          value={clientId}
          onChange={(e) => setClientId(e.target.value).toUpperCase()}
          placeholder="ENTER CLIENT ID"
          required
          tooltip="Client id"
          rules={[
            {
              required: true,
              message: "Please enter your Client ID",
            },
          ]}
        />

        <ArrowInput
          name="password"
          type="password"
          placeholder="ENTER PASSWORD"
          required
          tooltip="Password"
          rules={[
            {
              required: true,
              message: "Please enter your Password",
            },
          ]}
        />

        <ArrowInput
          name="otp_totp"
          type="password"
          placeholder="ENTER OTP/TOTP"
          required
          tooltip="Otp/Totp"
          rules={[
            {
              required: true,
              message: "Please enter your Otp/Totp",
            },
          ]}
          extra={
            <Row justify="space-between">
              <Col>
                <Link
                  className="custom-link"
                  onClick={() => ProcessTask("getOtp")}
                >
                  Get OTP
                </Link>
              </Col>
              <Col>
                <Link
                  className="custom-link"
                  onClick={() => ProcessTask("openForgotPasswordModal")}
                >
                  Forgot Password?
                </Link>
              </Col>
            </Row>
          }
        />

        {/* Submit Button */}
        <Row justify="center">
          <ArrowButton label="Submit" htmlType="submit" />
        </Row>
      </Form>
    </>
  );
};

export default QuickAuth;
