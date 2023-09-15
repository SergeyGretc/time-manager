import React, { useEffect } from "react";
import SelectField from "../../SelectField";
import { useState } from "react";
import FormLayout from "../../FormLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjectsById,
  getProjectsLoadingStatus,
} from "../../../store/projects";

import { getCurrentUserId } from "../../../store/users";
import {
  createAnalise,
  getAnaliseById,
  getOneAnaliseByName,
  loadAnaliseList,
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
  const userId = useSelector(getCurrentUserId());
  const dispatch = useDispatch();
  const isLoading = useSelector(getProjectsLoadingStatus());
  const getAllProjects = useSelector(getProjectsById(userId));
  const getAnaliseData = useSelector(getOneAnaliseByName(data.projectName));
  const getAllAnalise = useSelector(getAnaliseById(userId));
  // useEffect(() => {
  //   dispatch(loadAnaliseList(userId));
  // }, []);
  // useEffect(() => {
  //   const getCurrentAnaliseData = getAllAnalise.find(
  //     (el) => el.projectName === data.projectName
  //   );

  //   setValues(getCurrentAnaliseData);
  // }, [data]);
  // useEffect(() => {
  //   if (data.projectName) {
  //     setCurrentAnaliseData();
  //   }
  // }, [data]);

  useEffect(() => {
    if (getAllProjects) {
      let arr = [];

      getAllProjects.forEach((el, index) => {
        let obj = new Object();
        obj.value = index;
        obj.label = el.projectName;
        obj._id = el._id;
        obj.userId = el.userId;
        arr.push(obj);
      });

      setDataProjectsNew(arr);
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
      clearInterval(key);
      let a = statrSec();
      setKey(a);
    }
  }, [sec]);

  const buttonInvalidClass = () => {
    if (data.projectName) {
      return " btn-primary ";
    }

    return " btn-secondary disabled";
  };

  function statrSec() {
    return setInterval(() => {
      setSec((prev) => (prev = prev + 1));
    }, 1000);
  }
  const secondsTimer = (e) => {
    e.preventDefault();
    if (data.projectName) {
      if (start === false) {
        setStart((prev) => !prev);
        let a = statrSec();
        setKey(a);
      }
    }
  };
  const stopAddSeconds = (e) => {
    e.preventDefault();
    if (start === true) {
      setStart((prev) => !prev);
    }

    clearInterval(key);
  };

  const setCurrentAnaliseData = () => {
    if (!getAnaliseData) {
      setSec(0);
      setMin(0);
      setVarSec("00");
      setVarMin("00");
    } else {
      const currentAnaliseSec = getAnaliseData.sec;
      const currentAnaliseMin = getAnaliseData.min;

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
    console.log(getAllAnalise);
    const { value, name } = e.target;
    const getCurrentAnaliseData = getAllAnalise.find(
      (el) => el.projectName === value
    );
    console.log(getCurrentAnaliseData);
    setValues(getCurrentAnaliseData);
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (getAnaliseData) {
      const id = getAnaliseData._id;
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
          secondsTimer={secondsTimer}
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
