import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import EditorForOneTask from "./pages/EditorForOneTask";
import httpService from "./httpservice";
import { useDispatch, useSelector } from "react-redux";
import { getOneProjectsById, updateProject } from "./store/projects";

const EditTask = () => {
  const dispatch = useDispatch();
  const id = useParams().id;

  const project = useSelector(getOneProjectsById(id));

  // const endPoint = `https://time-manager-ddf1d-default-rtdb.europe-west1.firebasedatabase.app/project/${id}`;
  const handleSubmit = (project) => {
    // httpService
    //   .put(endPoint, data)
    //   .then((res) => console.log(res.data.content));

    dispatch(
      updateProject({
        ...project,
      })
    );
  };

  return (
    <div>
      {project !== null ? (
        <EditorForOneTask id onSubmit={handleSubmit} />
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default EditTask;
