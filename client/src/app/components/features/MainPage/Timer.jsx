import React, { useRef } from "react";
import SelectField from "../../SelectField";
import { useState } from "react";
import FormLayout from "../../FormLayout";
import { useDispatch, useSelector } from "react-redux";
import { getProjectsById } from "../../../store/projects";
import { convertArrForSelector } from "../../../utils/arrayConvertationForSelector";
import { getCurrentUserId } from "../../../store/users";
import {
  createAnalise,
  getAnaliseById,
  updateAnalise,
} from "../../../store/analise";
import TimerHeader from "./TimerHeader";

const Timer = () => {
  const [date, setDate] = useState(0);
  const [data, setData] = useState({
    projectName: "",
  });
  const [values, setValues] = useState({});
  const [timerToggled, setToggled] = useState(false);
  const userId = useSelector(getCurrentUserId());
  const dispatch = useDispatch();
  const getAllProjects = useSelector(getProjectsById(userId));
  const getAllAnalise = useSelector(getAnaliseById(userId));
  const interval = useRef(null);

  const buttonInvalidClass = () => {
    if (timerToggled) {
      return " btn-secondary disabled";
    }
    if (data.projectName) {
      return " btn-primary ";
    }
    return " btn-secondary disabled";
  };

  function startSec() {
    interval.current = setInterval(() => {
      setDate((d) => d + 1000);
    }, 1000);
  }
  const runTimer = () => {
    if (data.projectName) {
      if (timerToggled === false) {
        setToggled((prev) => !prev);
        startSec();
      }
    }
  };
  const stopAddSeconds = () => {
    if (timerToggled) {
      clearInterval(interval.current);
      setToggled((prev) => !prev);
    }
  };

  const setCurrentAnaliseData = (values) => {
    if (!values) {
      setDate(0);
    } else {
      setDate((values.min * 60 + values.sec) * 1000);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    const getCurrentAnaliseData = getAllAnalise.find(
      (el) => el.projectName === value
    );

    setValues(getCurrentAnaliseData || null);
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (getCurrentAnaliseData) {
      setCurrentAnaliseData(getCurrentAnaliseData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const sec = new Date(date).getSeconds();
    const min = new Date(date).getMinutes();
    if (values) {
      const id = values._id;
      const newData = {
        ...values,
        sec,
        min,
      };
      dispatch(
        updateAnalise(
          {
            ...newData,
          },
          id
        )
      );
    } else {
      const newData = {
        ...data,
        sec,
        min,
      };
      dispatch(createAnalise({ ...newData, pageId: userId }));
    }
    setData("");
    setDate(0);
  };

  if (getAllProjects) {
    const replacedProjectsArray = convertArrForSelector(getAllProjects);

    return (
      <FormLayout title="Таймер">
        <TimerHeader
          varMin={new Date(date).getMinutes()}
          varSec={new Date(date).getSeconds()}
          secondsTimer={runTimer}
          stopAddSeconds={stopAddSeconds}
        />
        <SelectField
          label=""
          name="projectName"
          value={data.projectName || ""}
          onChange={handleChange}
          options={replacedProjectsArray}
          defaultOption="Выберите проект"
        />

        <form onSubmit={handleSubmit} className="text-center">
          <button
            className={"btn  w-40 mx-auto text-center " + buttonInvalidClass()}
            type="submit"
          >
            Сохранить потраченное время
          </button>
        </form>
      </FormLayout>
    );
  }
};
export default Timer;
