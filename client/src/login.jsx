import React, { useState, useEffect } from "react";
import TextField from "./textField";
import { validate } from "./utils/validator";
import { validationSchema } from "./utils/validatorScheme";
import FormLayout from "./formLayout";
const MyForm = () => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const errors = validate(values, validationSchema);
    setErrors(errors);
  }, [values]);

  const isValid = Object.keys(errors).length === 0;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      console.log("Отправлено!");
    }
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { email, password } = values;
  return (
    <FormLayout title="Регистрация">
      <form onSubmit={handleSubmit}>
        <TextField
          id="email"
          name="email"
          label="Email"
          value={email}
          onChange={handleChange}
          error={errors.email}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          value={password}
          onChange={handleChange}
          type="password"
          error={errors.password}
        />

        <button
          type="submit"
          className="btn btn-primary w-100 mx-auto"
          disabled={!isValid}
        >
          Отправить
        </button>
      </form>
    </FormLayout>
  );
};

export default MyForm;
