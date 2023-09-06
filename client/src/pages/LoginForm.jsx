import React, { useState, useEffect } from "react";
import TextField from "../textField";
import { validate } from "../utils/validator";
import { validationSchema } from "../utils/validatorScheme";
import FormLayout from "../formLayout";
import { useAuth } from "../userAuth";
import { logIn } from "../store/users";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";
const LoginForm = () => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [enterError, setEnterError] = useState(null);
  // const { logIn } = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    const errors = validate(values, validationSchema);
    setErrors(errors);
  }, [values]);
  const history = useHistory();
  const isValid = Object.keys(errors).length === 0;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isValid) {
      const newData = { ...values };
      dispatch(logIn(newData));
      // await logIn(newData);

      // history.push(
      //   history.location.state ? history.location.state.from.pathname : "/"
      // );
    }
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    setEnterError(null);
  };

  const { email, password } = values;
  return (
    <FormLayout title="Вход в аккаунт">
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
        {enterError && <p className="text-danger">{enterError}</p>}
        <button
          type="submit"
          className="btn btn-primary w-100 mx-auto"
          disabled={!isValid || enterError}
        >
          Отправить
        </button>
      </form>
    </FormLayout>
  );
};

export default LoginForm;
