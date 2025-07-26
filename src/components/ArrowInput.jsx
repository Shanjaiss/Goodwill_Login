import React from "react";
import { Input, Select, Checkbox, DatePicker, Form, Tooltip } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const ArrowInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  options = [],
  placeholder = "",
  initialValue,
  rules = [],
  extra,
  tooltip,
  placement,
  dependencies = [],
  suffix,
}) => {
  const getInputComponent = () => {
    switch (type) {
      case "select":
        return (
          <Select
            value={value}
            onChange={(val) => onChange({ target: { name, value: val } })}
            placeholder={placeholder}
            suffixIcon={suffix} // ✅ applied here if needed
          >
            {options.map((opt) => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>
        );

      case "checkbox":
        return (
          <Checkbox
            checked={value}
            onChange={(e) =>
              onChange({ target: { name, value: e.target.checked } })
            }
          >
            {label}
          </Checkbox>
        );

      case "date":
        return (
          <DatePicker
            value={value ? dayjs(value) : null}
            onChange={(date, dateString) =>
              onChange({ target: { name, value: dateString } })
            }
            placeholder={placeholder}
            style={{ width: "100%" }}
            suffix={suffix}
          />
        );

      case "password":
        return (
          <Input.Password
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        );

      default:
        return (
          <Input
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            suffix={suffix}
          />
        );
      // default:
      //   return (
      //     <Input
      //       name={name}
      //       value={value}
      //       onChange={(e) => {
      //         const rawValue = e.target.value;
      //         const sanitized = rawValue
      //           .replace(/[^a-zA-Z0-9]/g, "")
      //           .toUpperCase();
      //         onChange({ target: { name, value: sanitized } });
      //       }}
      //       placeholder={placeholder}
      //       suffix={suffix}
      //     />
      //   );
    }
  };

  return (
    <Tooltip title={tooltip} placement={placement}>
      <Form.Item
        label={type !== "checkbox" ? label : ""}
        name={name}
        initialValue={initialValue}
        rules={rules ?? []}
        dependencies={dependencies ?? []}
        extra={extra}
        suffix={suffix}
      >
        {getInputComponent()}
      </Form.Item>
    </Tooltip>
  );
};

export default ArrowInput;
