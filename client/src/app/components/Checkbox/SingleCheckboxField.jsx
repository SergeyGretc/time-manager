import React from "react";

const SingleCheckboxField = (props) => {
  const { name, label, value, checked, onChange } = props;
  const getOptionId = (value, label) => `${value}_${label}`;

  const id = getOptionId(value, label);

  return (
    <div className="form-check form-check-inline">
      <input
        className="form-check-input"
        type="checkbox"
        id={id}
        checked={checked}
        name={name}
        value={value}
        onChange={onChange}
      />
      <label className="form-check-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default SingleCheckboxField;
