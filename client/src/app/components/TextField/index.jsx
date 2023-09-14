import React, { useState } from "react";

const TextField = (props) => {
  const { name, label, value, onChange, type, error } = props;
  const getInputClasses = () => {
    return "form-control" + (error ? " is-invalid" : "");
  };
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>{" "}
      <div className="input-group has-validation">
        <input
          value={value}
          onChange={onChange}
          id={name}
          type={showPassword ? "text" : type}
          name={name}
          className={getInputClasses()}
        />
        {type === "password" && (
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={toggleShowPassword}
          >
            {showPassword ? "Скрыть" : "Показать"} пароль
          </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

TextField.defaultValues = {
  type: "text",
};

export default TextField;
