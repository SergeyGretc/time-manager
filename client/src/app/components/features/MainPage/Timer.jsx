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

  const [dataProjectsNew, setDataProjectsNew] = useState([]);
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [key, setKey] = useState(null);
  const [varSec, setVarSec] = useState("00");
  const [varMin, setVarMin] = useState("00");
  const [start, setStart] = useState(false);
  const [choosenAnalise, setChoosenAnalise] = useState({});
  const userId = useSelector(getCurrentUserId());
  const dispatch = useDispatch();
  const isLoading = useSelector(getProjectsLoadingStatus());
  const getAllProjects = useSelector(getProjectsById(userId));

  const getAllAnalise = useSelector(getAnaliseById(userId));

  useEffect(() => {
    if (choosenAnalise) {
      setCurrentAnaliseData();
    }
  }, [choosenAnalise]);

  useEffect(() => {
    if (getAllProjects) {
      const replacedProjectsArray = convertArrForSelector(getAllProjects);
      setDataProjectsNew(replacedProjectsArray);
    }
  }, [isLoading]);

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

  const setCurrentAnaliseData = () => {
    if (!choosenAnalise) {
      setSec(0);
      setMin(0);
      setVarSec("00");
      setVarMin("00");
    } else {
      const currentAnaliseSec = choosenAnalise.sec;
      const currentAnaliseMin = choosenAnalise.min;

      if (currentAnaliseSec < 10) {
        setVarSec("0" + currentAnaliseSec);
        setSec(currentAnaliseSec);
      }
      if (currentAnaliseMin < 10) {
        setVarMin("0" + currentAnaliseMin);
        setMin(currentAnaliseMin);
      }
      if (currentAnaliseSec >= 10) {
        setVarSec(currentAnaliseSec);
        setSec(currentAnaliseSec);
      }
      if (currentAnaliseMin >= 10) {
        setVarMin(currentAnaliseMin);
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

    setValues(getCurrentAnaliseData);
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    const filteredAnalise = getAllAnalise.find(
      (el) => el.projectName === value
    );
    setChoosenAnalise(filteredAnalise || null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (choosenAnalise) {
      const id = choosenAnalise._id;
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

  if (dataProjectsNew) {
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
          options={dataProjectsNew}
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
