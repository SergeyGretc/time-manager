import React, { useState, useEffect } from "react";
import FormLayout from "../formLayout";
import TextField from "../textField";
import { validate } from "../utils/validator";
import { validationSchema } from "./editorValidationForm";
import SelectField from "../selectField";

import { levelTypeList, yesNoOptions } from "../utils/fieldOptions";
import RadioField from "../radioField";

import { useDispatch, useSelector } from "react-redux";
import { createProject } from "../store/projects";
import { getCurrentUserId, inState } from "../store/users";

const EditForm = () => {
  const [values, setValues] = useState({
    projectName: "",
    level: "",
    priority: "",
  });
  const [errors, setErrors] = useState({});
  const isValid = Object.keys(errors).length === 0;

  const userId = useSelector(getCurrentUserId());
  const state = useSelector(inState());
  console.log(state);

  const dispatch = useDispatch();

  const clearForm = () => {
    setValues({
      projectName: "",

      level: "",
      priority: "",
    });
    setErrors({});
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      const newData = {
        ...values,
      };

      console.log(userId);
      dispatch(createProject({ ...newData, pageId: userId }));

      clearForm();
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
    const errors = validate(values, validationSchema);
    setErrors(errors);
  }, [values]);
  return (
    <FormLayout title="Новый проект">
      <form onSubmit={handleSubmit}>
        <TextField
          id="projectName"
          name="projectName"
          label="Название проекта"
          value={values.projectName || ""}
          onChange={handleChange}
          error={errors.projectName}
        />

        <SelectField
          label="Сложность проекта"
          name="level"
          value={values.level || ""}
          onChange={handleChange}
          error={errors.level}
          options={levelTypeList}
          defaultOption="Выберите уровень сложности проекта"
        />
        <RadioField
          options={yesNoOptions}
          label="Хотите выполнить его как можно раньше?"
          value={values.priority || ""}
          name="priority"
          onChange={handleChange}
          error={errors.priority}
        />

        <button
          className="btn btn-primary w-100 mx-auto"
          type="submit"
          disabled={!isValid}
        >
          Создать проект
        </button>
      </form>
    </FormLayout>
  );
};

export default EditForm;
