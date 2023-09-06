import React, { useState, useEffect } from "react";
import TextField from "../textField";

import { validate } from "../utils/validator";
// import { validationSchema } from "./utils/validatorScheme";
import { validationSchema } from "../utils/validatorScheme";
import FormLayout from "../formLayout";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId, getUserById, updateUser } from "../store/users";
const EditUserProfile = () => {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({});

  const userId = useSelector(getCurrentUserId());
  const currentUser = useSelector(getUserById(userId));
  const history = useHistory();
  const dispatch = useDispatch();
  // const { signUp } = useAuth();
  useEffect(() => {
    const errors = validate(values, validationSchema);
    setErrors(errors);
  }, [values]);

  const isValid = Object.keys(errors).length === 0;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      dispatch(
        updateUser({
          ...values,
        })
      );
      //  signUp(newData);
      // history.push("/");
    }
  };
  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    // if (currentUser && !values) {
    //   setValues({
    //     ...currentUser,
    //   });
    // }

    setValues({
      ...currentUser,
    });
  }, [currentUser]);

  const { email, password, name } = values;
  console.log(currentUser);
  console.log(values);
  return (
    <FormLayout title="Персональные данные">
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

export default EditUserProfile;
