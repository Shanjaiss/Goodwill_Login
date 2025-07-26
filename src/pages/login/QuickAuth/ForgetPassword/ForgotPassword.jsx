import React from "react";
import { Form, Typography, Row, Col, Modal, Alert } from "antd";
import ArrowInput from "../../../../components/ArrowInput";
import { ArrowButton } from "../../../../components/ArrowButton";
import { ArrowAlert } from "../../../../components/ArrowAlert";

export const ForgotPassword = ({
  visible,
  onClose,
  SubTD,
  errorMsg,
  setErrorMsg,
  successMsg,
  setSuccessMsg,
  ProcessTask,
  form,
}) => {
  return (
    <Modal
      className="otp-modal"
      title={
        <div className="generateModal-header">
          <Typography.Text className="generateModal-title">
            FORGET PASSWORD
          </Typography.Text>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      centered
      width={400}
    >
      {errorMsg && (
        <ArrowAlert
          description={errorMsg}
          type="error"
          onClose={() => {
            setErrorMsg(null);
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
      <Form
        layout="vertical"
        form={form}
        onFinish={() => ProcessTask("submitForm")}
      >
        <ArrowInput
          name="clientId"
          type="text"
          initialValue={SubTD}
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
          name="pan"
          type="password"
          placeholder="ENTER PAN"
          required
          tooltip="Pan"
          rules={[
            {
              required: true,
              message: "Please enter your Pan",
            },
          ]}
        />

        <ArrowInput
          name="dob"
          type="number"
          placeholder="DOB [DDMMYYYY e.g., 01011978]"
          required
          tooltip="DOB"
          rules={[
            {
              required: true,
              message: "Please enter your date of birth",
            },
          ]}
        />

        <Row justify="center">
          <Col>
            <ArrowButton label="Submit" htmlType="submit" />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
