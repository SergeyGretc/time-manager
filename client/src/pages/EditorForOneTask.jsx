import React, { useState, useEffect } from "react";
import FormLayout from "../formLayout";
import TextField from "../textField";
import { validate } from "../utils/validator";
import { validationSchema } from "./editorValidationForm";
import SelectField from "../selectField";
import {
  levelTypeList,
  giftList,
  yesNoOptions,
  agreements,
} from "../utils/fieldOptions";
import RadioField from "../radioField";

import { useDispatch, useSelector } from "react-redux";
import { getOneProjectsById, updateProject } from "../store/projects";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const EditorForOneTask = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const isValid = Object.keys(errors).length === 0;
  const id = useParams().id;
  const currentProject = useSelector(getOneProjectsById(id));
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      const newData = {
        ...values,
      };
      console.log(newData);
      console.log(values);
      // await addTask(newData);
      // history.push("/projects");
      dispatch(
        updateProject(
          {
            ...newData,
          },
          id
        )
      );
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
    console.log(values);
  }, [values]);

  useEffect(() => {
    setValues({
      ...currentProject,
    });
    console.log(currentProject);
  }, [currentProject]);

  const { projectName } = values;
  return (
    <FormLayout title="Редактор проекта">
      <form onSubmit={handleSubmit}>
        <TextField
          id="projectName"
          name="projectName"
          label="Название проекта"
          value={projectName}
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
        {/* <MultiSelect
          options={giftList}
          onChange={handleChange}
          value={values.gifts || []}
          name="gifts"
          label="Выберите подарок"
        />
        <CheckboxField
          name="agreement"
          label="Подтвердите согласие"
          options={agreements}
          onChange={handleChange}
          value={values.agreement || []}
          error={errors.agreement}
        /> */}
        <button className="btn btn-primary w-100 mx-auto" type="submit">
          Создать
        </button>
      </form>
    </FormLayout>
  );
};

export default EditorForOneTask;
