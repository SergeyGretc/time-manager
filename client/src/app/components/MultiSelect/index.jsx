import React from "react";

import Select from "react-select";

const MultiSelect = ({ name, value, label, onChange, options }) => {
  const handleChange = (values) => {
    const fakeEvent = {
      target: {
        name,
        value: values,
      },
    };
    onChange(fakeEvent);
  };

  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <Select
        isMulti
        options={options}
        value={value}
        onChange={handleChange}
        name={name}
        id={name}
      />
    </div>
  );
};

export default MultiSelect;
