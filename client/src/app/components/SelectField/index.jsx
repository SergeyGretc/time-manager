import React from "react";

const SelectField = (props) => {
  const { label, name, value, onChange, error, options, defaultOption } = props;
  const getSelectClasses = () => {
    return "form-select" + (error ? " is-invalid" : "");
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className={getSelectClasses()}
        id={name}
        name={name}
      >
        <option disabled value="">
          {defaultOption}
        </option>

        {options.map(({ value, label }) => (
          <option key={value} value={label}>
            {label}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};
SelectField.defaultProps = {
  defaultOption: "Выберите вариант...",
};

export default SelectField;
