import React from "react";
import SingleCheckboxField from "./singleCheckboxField";

export const CheckboxField = (props) => {
  const { name, value, onChange, label, options, error } = props;

  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    const newValue = value.includes(inputValue)
      ? value.filter((v) => v !== inputValue)
      : [...value, inputValue];

    const fakeEvent = {
      target: {
        name,
        value: newValue,
      },
    };

    onChange(fakeEvent);
  };
  const getInputClasses = () => {
    return error ? " is-invalid" : "";
  };

  const getIsChecked = (inputValue) => value.includes(inputValue);

  return (
    <div className="mb-4">
      <p className={getInputClasses()}>
        <label>{label}</label>
      </p>
      {options.map((option) => (
        <SingleCheckboxField
          key={option.value}
          name={name}
          label={option.label}
          value={option.value}
          onChange={handleChange}
          checked={getIsChecked(option.value)}
        />
      ))}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default CheckboxField;
