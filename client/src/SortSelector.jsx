import React from "react";

const SortSelect = ({ value, options, onSort }) => {
  return (
    <div className="d-flex align-items-center mt-4">
      <span className="d-block me-2">Сортировка</span>
      <select className="form-select" value={value} onChange={onSort}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortSelect;
