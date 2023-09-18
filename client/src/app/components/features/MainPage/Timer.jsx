import React, { useEffect } from "react";
import SelectField from "../../SelectField";
import { useState } from "react";
import FormLayout from "../../FormLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjectsById,
  getProjectsLoadingStatus,
} from "../../../store/projects";
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

  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [key, setKey] = useState(null);
  const [varSec, setVarSec] = useState("00");
  const [varMin, setVarMin] = useState("00");
  const [start, setStart] = useState(false);

  const userId = useSelector(getCurrentUserId());
  const dispatch = useDispatch();

  const getAllProjects = useSelector(getProjectsById(userId));

  const getAllAnalise = useSelector(getAnaliseById(userId));

  useEffect(() => {
    if (sec < 10) {
      setVarSec("0" + sec);
    }
    if (min < 10) {
      setVarMin("0" + min);
    }
    if (sec >= 10) {
      setVarSec(sec);
    }
    if (min >= 10) {
      setVarMin(min);
    }
    if (sec > 59) {
      setSec(0);
      setVarSec("00");
      setMin((prev) => (prev += 1));
      setStart((prev) => !prev);
    }
  }, [sec, min]);

  const buttonInvalidClass = () => {
    if (data.projectName) {
      return " btn-primary ";
    }

    return " btn-secondary disabled";
  };

  function startSec() {
    const timer = setInterval(() => {
      setSec((prev) => (prev = prev + 1));

      setKey(timer);
    }, 1000);

    return timer;
  }
  const runTimer = () => {
    if (data.projectName) {
      if (start === false) {
        setStart((prev) => !prev);
        startSec();
      }
    }
  };
  const stopAddSeconds = () => {
    if (start === true) {
      setStart((prev) => !prev);

      clearInterval(key);
    }
  };

  const setCurrentAnaliseData = (values) => {
    if (!values) {
      setSec(0);
      setMin(0);
      setVarSec("00");
      setVarMin("00");
    } else {
      const currentAnaliseSec = values.sec;
      const currentAnaliseMin = values.min;

      if (currentAnaliseSec < 10) {
        setSec(currentAnaliseSec);
      }
      if (currentAnaliseMin < 10) {
        setMin(currentAnaliseMin);
      }
      if (currentAnaliseSec >= 10) {
        setSec(currentAnaliseSec);
      }
      if (currentAnaliseMin >= 10) {
        setMin(currentAnaliseMin);
      }
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
    setSec(0);
    setMin(0);
    setVarSec("00");
    setVarMin("00");
  };

  if (getAllProjects) {
    const replacedProjectsArray = convertArrForSelector(getAllProjects);
    return (
      <FormLayout title="Таймер">
        <TimerHeader
          varMin={varMin}
          varSec={varSec}
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
