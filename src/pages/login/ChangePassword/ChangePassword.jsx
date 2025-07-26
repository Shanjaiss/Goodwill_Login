import React from "react";
import { Row, Col, Form, Typography, Alert } from "antd";
import "../../../assets/css/main.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import ArrowInput from "../../../components/ArrowInput";
import { App } from "../../../App";
import { ArrowButton } from "../../../components/ArrowButton";
import { ArrowAlert } from "../../../components/ArrowAlert";

const { Link } = Typography;

export const ChangePassword = ({
  apiKey,
  ProcessTask,
  navigate,
  errorMsg,
  setErrorMsg,
  errorApiKeyMsg,
  setErrorApiKeyMsg,
  form,
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

      <ArrowAlert
        description="Password expired or User logging in for the first time. Please change the password."
        type="info"
      />

      <Form
        form={form}
        layout="vertical"
        onFinish={() => ProcessTask("submitForm")}
      >
        <ArrowInput
          name="clientId"
          type="text"
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
          name="oldPassword"
          type="password"
          placeholder="ENTER OLD PASSWORD"
          required
          tooltip="Old Password"
          rules={[
            {
              required: true,
              message: "Please enter your Old Password",
            },
          ]}
        />

        <ArrowInput
          name="newPassword"
          type="password"
          placeholder="ENTER NEW PASSWORD"
          required
          dependencies={["oldPassword"]}
          tooltip={
            <>
              <div>Password must:</div>
              <ul>
                <li>Be at least 7 characters</li>
                <li>Have at least one digit</li>
                <li>Have one lowercase and uppercase letter</li>
                <li>Have one special character (# $ - * @)</li>
              </ul>
            </>
          }
          rules={[
            {
              required: true,
              message: "Please enter your New Password",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value) {
                  return Promise.resolve();
                }

                const oldPassword = getFieldValue("oldPassword");

                if (value === oldPassword) {
                  return Promise.reject(
                    new Error(
                      "New password must be different from old password"
                    )
                  );
                }

                if (!/[A-Z]/.test(value)) {
                  return Promise.reject(
                    new Error(
                      "Password must contain at least one uppercase letter"
                    )
                  );
                }

                if (!/[a-z]/.test(value)) {
                  return Promise.reject(
                    new Error(
                      "Password must contain at least one lowercase letter"
                    )
                  );
                }

                if (!/[0-9]/.test(value)) {
                  return Promise.reject(
                    new Error("Password must contain at least one number")
                  );
                }

                if (!/[#@$\-*]/.test(value)) {
                  return Promise.reject(
                    new Error(
                      "Password must contain at least one special character: # @ $ - *"
                    )
                  );
                }

                if (value.length < 7) {
                  return Promise.reject(
                    new Error("Password must be at least 7 characters long")
                  );
                }

                return Promise.resolve();
              },
            }),
          ]}
        />

        <ArrowInput
          name="confirmPassword"
          type="password"
          placeholder="ENTER CONFIRM PASSWORD"
          required
          tooltip="Confirm Password"
          dependencies={["newPassword"]}
          rules={[
            {
              required: true,
              message: "Please enter your Confirm Password",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Confirm password does not match new password")
                );
              },
            }),
          ]}
          extra={
            <Row justify="end">
              <Col>
                <Link
                  className="custom-link"
                  onClick={() => navigate(`/login?api_key=${apiKey}`)}
                >
                  <ArrowLeftOutlined /> Back to login
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
