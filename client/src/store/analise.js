import { createSlice, createAction } from "@reduxjs/toolkit";

import { analiseService } from "./analise.service";

const analiseSlice = createSlice({
  name: "analise",
  initialState: {
    entities: [],
    isLoading: true,
    error: null,
  },

  reducers: {
    analiseRequested: (state) => {
      state.isLoading = true;
    },
    analiseReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    analiseRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    analiseCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    analiseUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((u) => u._id === action.payload._id)
      ] = action.payload;
    },
    analiseRemoved: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload);
    },
    // analiseRemoved: (state, action) => {
    //   state.entities = state.entities.filter((c) => c._id !== action.payload);
    // },
    // projectUpdateSuccessed: (state, action) => {
    //   state.entities[
    //     state.entities.findIndex((u) => u._id === action.payload._id)
    //   ] = action.payload;
    // },
  },
});

const { reducer: analiseReducer, actions } = analiseSlice;
const {
  analiseRequested,
  analiseReceved,
  analiseRequestFiled,
  analiseCreated,
  analiseUpdateSuccessed,
  analiseRemoved,
  // analiseUpdateSuccessed,
} = actions;

const addAnaliseRequested = createAction("analise/addAnaliseRequested");
const analiseUpdateRequested = createAction("analise/analiseUpdateRequested");
const analiseUpdateFailed = createAction("analise/analiseUpdateFailed");
const removeAnaliseRequested = createAction("analise/removeAnaliseRequested");

// const analiseUpdateRequested = createAction("analise/analiseUpdateRequested");
// const analiseUpdateFailed = createAction("analise/analiseUpdateFailed");
export const loadAnaliseList = (userId) => async (dispatch) => {
  dispatch(analiseRequested());
  try {
    const { content } = await analiseService.getAllAnalise(userId);
    dispatch(analiseReceved(content));
  } catch (error) {
    dispatch(analiseRequestFiled(error.message));
  }
};

export const createAnalise = (payload) => async (dispatch) => {
  dispatch(addAnaliseRequested());

  try {
    console.log("content");
    const { content } = await analiseService.createAnalise(payload);
    console.log(content);
    dispatch(analiseCreated(content));
    console.log(content);
  } catch (error) {
    console.log(error.message);
    dispatch(analiseRequestFiled(error.message));
  }
};

export const getAnaliseById = (userId) => (state) => {
  if (state.analise.entities) {
    return state.analise.entities.filter((u) => u.userId === userId);
  }
};
export const getOneAnaliseByName = (projectName) => (state) => {
  if (state.analise.entities) {
    return state.analise.entities.find((el) => el.projectName === projectName);
  }
};

export const removeAnalise = (analiseId) => async (dispatch) => {
  dispatch(removeAnaliseRequested());

  try {
    const { content } = await analiseService.deleteAnalise(analiseId);

    if (!content) {
      dispatch(analiseRemoved(analiseId));
    }
  } catch (error) {
    dispatch(analiseRequestFiled(error.message));
  }
};

export const updateAnalise = (payload, id) => async (dispatch) => {
  console.log(payload);
  dispatch(analiseUpdateRequested());

  try {
    const { content } = await analiseService.update(payload, id);
    console.log(content);
    dispatch(analiseUpdateSuccessed(content));
    // history.push(`/users/${content._id}`);
  } catch (error) {
    dispatch(analiseUpdateFailed(error.message));
  }
};

// export const updateProject = (payload, id) => async (dispatch) => {
//   console.log(payload);
//   dispatch(projectUpdateRequested());

//   try {
//     const { content } = await projectService.update(payload, id);
//     console.log(content);
//     dispatch(projectUpdateSuccessed(content));
//     // history.push(`/users/${content._id}`);
//   } catch (error) {
//     console.log("Jib,jxrf");
//     dispatch(projectUpdateFailed(error.message));
//   }
// };

// export const getProjects = () => (state) => state.projects.entities;

// export const getProjectsById = (userId) => (state) => {
//   if (state.projects.entities) {
//     return state.projects.entities.filter((u) => u.userId === userId);
//   }
// };

// export const getOneProjectsById = (id) => (state) => {
//   if (state.projects.entities) {
//     return state.projects.entities.find((pr) => pr._id === id);
//   }
// };

// export const getProjectsLoadingStatus = () => (state) =>
//   state.projects.isLoading;
export default analiseReducer;
