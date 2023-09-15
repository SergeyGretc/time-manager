import React, { useState, useEffect } from "react";
import TextField from "../../TextField";
import { validate } from "../../../utils/validator";
import { validationSchema } from "../../../utils/validatorScheme";
import FormLayout from "../../FormLayout";

import { signUp } from "../../../store/users";

import { useDispatch } from "react-redux";
const RegistrationForm = () => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email: "",
    password: "",
    name: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const errors = validate(values, validationSchema);
    setErrors(errors);
  }, [values]);

  const isValid = Object.keys(errors).length === 0;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      const newData = {
        ...values,
      };
      dispatch(signUp(newData));
    }
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { email, password, name } = values;

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
          id="name"
          name="name"
          label="Имя"
          value={name}
          onChange={handleChange}
          error={errors.name}
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

export default RegistrationForm;
