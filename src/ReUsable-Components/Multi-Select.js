import React from "react";
import { Select, Space } from "antd";

const CustomSelect = ({
  customSelectedValues,
  setCustomSelectedValues,
  inputName,
  options,
  disabled,
  defaultValue,
  onChange,
  className
}) => {
  const handleChange = (value) => {
    // Update the state with the selected id values
    setCustomSelectedValues(value.map((id) => id));
    if (onChange) {
      onChange(value.map((id) => id));
    }
  };

  return (
    <div>
      <Select
        mode="multiple"
        className={`custom-select ${className}`}
        placeholder={
          <span className="antd-placeholder">Select {inputName}</span>
        }
        disabled={disabled}
        defaultValue={defaultValue}
        value={customSelectedValues}
        onChange={handleChange}
        options={options.map((option) => ({
          value: option.id,
          label: option.label,
        }))}
        optionRender={(option) => (
          <Space>
            <span role="img" aria-label={option.label}>
              {option.label}
            </span>
          </Space>
        )}
      />
    </div>
  );
};

export default CustomSelect;