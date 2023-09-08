import React, { useEffect } from "react";
import SelectField from "../selectField";
import { useState } from "react";
import FormLayout from "../formLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjects,
  getProjectsById,
  getProjectsLoadingStatus,
  loadProjectsList,
} from "../store/projects";

import icon from "./arrow-right-circle.svg";
import stop from "./stop-circle-fill.svg";
import { getCurrentUserId, loadUsersList } from "../store/users";
import {
  createAnalise,
  getAnaliseById,
  getOneAnaliseByName,
  loadAnaliseList,
  updateAnalise,
} from "../store/analise";

const Timer = () => {
  const [data, setData] = useState({
    projectName: "",
  });
  const [values, setValues] = useState({});
  const [dataProjects, setDataProjects] = useState([]);
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
  useEffect(() => {
    dispatch(loadAnaliseList(userId));
  }, []);
  useEffect(() => {
    const getCurrentAnaliseData = getAllAnalise.find(
      (el) => el.projectName === data.projectName
    );

    setValues(getCurrentAnaliseData);
  }, [data]);
  useEffect(() => {
    if (data.projectName) {
      setCurrentAnaliseData();
    }
  }, [data]);

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

  function statrSec() {
    return setInterval(() => {
      setSec((prev) => (prev = prev + 1));
    }, 1000);
  }
  const secondsTimer = (e) => {
    e.preventDefault();
    if (start === false) {
      setStart((prev) => !prev);
      let a = statrSec();
      setKey(a);
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
    const { value, name } = e.target;

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
      console.log(newData);
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
  };

  if (dataProjectsNew) {
    return (
      <FormLayout title="Таймер">
        <div className="container text-center ">
          <span className="text-center p-1 fs-4 align-bottom">{`${varMin} : ${varSec}`}</span>
          <img src={icon} onClick={secondsTimer} className=" p-1 " />
          <img src={stop} onClick={stopAddSeconds} className=" p-1" />
        </div>

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
            className="btn btn-primary w-40 mx-auto  text-center"
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
