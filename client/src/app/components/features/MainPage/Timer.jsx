import React, { useEffect, useRef } from "react";
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
  const [data, setData] = useState({
    projectName: "",
  });
  const [values, setValues] = useState({});
  const [timerData, setTimerData] = useState({ sec: 0, min: 0 });

  const [timerToggled, setToggled] = useState(false);
  const userId = useSelector(getCurrentUserId());
  const dispatch = useDispatch();
  const getAllProjects = useSelector(getProjectsById(userId));
  const getAllAnalise = useSelector(getAnaliseById(userId));
  const interval = useRef(null);

  useEffect(() => {
    if (timerData.sec > 59) {
      setTimerData(
        Object.defineProperties(timerData, {
          sec: { value: 0 },
          min: { value: timerData.min + 1 },
        })
      );
    }
  }, [timerData.sec]);

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
      setTimerData(
        Object.defineProperty(timerData, "sec", { value: timerData.sec + 1 })
      );
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
      setTimerData({ sec: 0, min: 0 });
    } else {
      setTimerData((prev) =>
        Object.defineProperties(prev, {
          sec: { value: values.sec },
          min: { value: values.min },
        })
      );
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
    const sec = timerData.sec;
    const min = timerData.min;
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
    setTimerData({ sec: 0, min: 0 });
  };

  if (getAllProjects) {
    const replacedProjectsArray = convertArrForSelector(getAllProjects);
    return (
      <FormLayout title="Таймер">
        <TimerHeader
          varMin={timerData.min}
          varSec={timerData.sec}
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
