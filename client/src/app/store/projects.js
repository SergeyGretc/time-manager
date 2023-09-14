import { createSlice, createAction } from "@reduxjs/toolkit";
import { projectService } from "../services/project.service";

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },

  reducers: {
    projectsRequested: (state) => {
      state.isLoading = true;
    },
    projectsReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    projectsRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    projectCteated: (state, action) => {
      state.entities.push(action.payload);
    },
    projectRemoved: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload);
    },
    projectUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((u) => u._id === action.payload._id)
      ] = action.payload;
    },
  },
});

const { reducer: projectsReducer, actions } = projectSlice;
const {
  projectsRequested,
  projectsReceved,
  projectsRequestFiled,
  projectCteated,
  projectRemoved,
  projectUpdateSuccessed,
} = actions;

const addProjectRequested = createAction("projects/addProjectRequested");
const removeProjectRequested = createAction("projects/removeProjectRequested");
const projectUpdateRequested = createAction("projects/projectUpdateRequested");
const projectUpdateFailed = createAction("projects/projectUpdateFailed");
export const loadProjectsList = (userId) => async (dispatch) => {
  dispatch(projectsRequested());
  try {
    const { content } = await projectService.getAllProjects(userId);
    dispatch(projectsReceved(content));
  } catch (error) {
    dispatch(projectsRequestFiled(error.message));
  }
};

export const createProject = (payload) => async (dispatch) => {
  dispatch(addProjectRequested());

  try {
    const { content } = await projectService.createProject(payload);
    dispatch(projectCteated(content));
  } catch (error) {
    dispatch(projectsRequestFiled(error.message));
  }
};
export const removeProject = (projectId) => async (dispatch) => {
  dispatch(removeProjectRequested());

  try {
    const { content } = await projectService.deleteProject(projectId);

    if (!content) {
      dispatch(projectRemoved(projectId));
    }
  } catch (error) {
    dispatch(projectsRequestFiled(error.message));
  }
};

export const updateProject = (payload, id) => async (dispatch) => {
  console.log(payload);
  dispatch(projectUpdateRequested());

  try {
    const { content } = await projectService.update(payload, id);
    console.log(content);
    dispatch(projectUpdateSuccessed(content));
  } catch (error) {
    dispatch(projectUpdateFailed(error.message));
  }
};

export const getProjects = () => (state) => state.projects.entities;

export const getProjectsById = (userId) => (state) => {
  if (state.projects.entities) {
    return state.projects.entities.filter((u) => u.userId === userId);
  }
};

export const getOneProjectsById = (id) => (state) => {
  if (state.projects.entities) {
    return state.projects.entities.find((pr) => pr._id === id);
  }
};

export const getProjectsLoadingStatus = () => (state) =>
  state.projects.isLoading;
export default projectsReducer;
