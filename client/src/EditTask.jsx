import React from "react";

import { useParams } from "react-router";
import EditorForOneTask from "./pages/EditorForOneTask";

import { useDispatch, useSelector } from "react-redux";
import { getOneProjectsById, updateProject } from "./store/projects";

const EditTask = () => {
  const dispatch = useDispatch();
  const id = useParams().id;

  const project = useSelector(getOneProjectsById(id));

  const handleSubmit = (project) => {
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
