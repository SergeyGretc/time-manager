// import { configureStore } from "@reduxjs/toolkit";
// import { combineReducers } from "@reduxjs/toolkit";
import analiseReducer from "./analise";
import projectsReducer from "./projects";
import usersReducer from "./users";
const { combineReducers, configureStore } = require("@reduxjs/toolkit");
const rootReducer = combineReducers({
  projects: projectsReducer,
  users: usersReducer,
  analise: analiseReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
