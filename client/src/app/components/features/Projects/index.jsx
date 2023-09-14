import React, { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  getProjectsById,
  loadProjectsList,
  removeProject,
} from "../../../store/projects";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserId } from "../../../store/users";
import iconTrash from "../../../assets/icons/trash.svg";
import iconRedact from "../../../assets/icons/redact.svg";
import Header from "./Header";
import Table from "./Table";

const Projects = () => {
  const userId = useSelector(getCurrentUserId());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProjectsList(userId));
  }, []);

  const getAllProjects = useSelector(getProjectsById(userId));
  const handleTaskEditor = (param) => {
    history.push(`/edit/${param}`);
  };
  const history = useHistory();
  const handleEditor = () => {
    history.push("/createtask");
  };
  const handleRemoveTask = (id) => {
    dispatch(removeProject(id));
  };

  if (getAllProjects) {
    return (
      <div className="container">
        <Header handleEditor={handleEditor} />
        <Table
          getAllProjects={getAllProjects}
          handleTaskEditor={handleTaskEditor}
          handleRemoveTask={handleRemoveTask}
        />
      </div>
    );
  }
  return "Loading...";
};
export default Projects;
