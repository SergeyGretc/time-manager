import { createAction, createSlice } from "@reduxjs/toolkit";
import userService from "../user.service";
import authService from "./auth.service";
import localStorageService from "../localStorageService";
import history from "../utils/history";

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: false,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false,
    }
  : {
      entities: null,
      isLoading: true,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false,
    };

const usersSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceved: (state, action) => {
      state.entities = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    usersRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((u) => u._id === action.payload._id)
      ] = action.payload;
    },
    userLogedOut: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = null;
      state.dataLoaded = false;
    },
  },
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRequested,
  usersReceved,
  usersRequestFiled,
  authRequestSuccess,
  authRequestFailed,
  userUpdateSuccessed,
  userLogedOut,
} = actions;

const authRequested = createAction("users/authRequested");
const userUpdateFailed = createAction("users/userUpdateFailed");
const userUpdateRequested = createAction("users/userUpdateRequested");
export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.get();
    dispatch(usersReceved(content));
  } catch (error) {
    dispatch(usersRequestFiled(error.message));
  }
};
export const logIn = (payload) => async (dispatch) => {
  const { email, password } = payload;
  dispatch(authRequested());
  try {
    const data = await authService.login({ email, password });
    localStorageService.setTokens(data);
    dispatch(authRequestSuccess({ userId: data.userId }));
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

export const signUp = (payload) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.register(payload);
    localStorageService.setTokens(data);
    dispatch(authRequestSuccess({ userId: data.userId }));
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};
export const updateUser = (payload) => async (dispatch) => {
  dispatch(userUpdateRequested());
  try {
    const { content } = await userService.update(payload);
    dispatch(userUpdateSuccessed(content));
    // history.push(`/users/${content._id}`);
  } catch (error) {
    dispatch(userUpdateFailed(error.message));
  }
};
export const getUserById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((u) => u._id === userId);
  }
};
export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLogedOut());
  history.push("/login");
};
export const inState = () => (state) => state.users;
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getCurrentUserId = () => (state) => {
  if (state.users.isLoggedIn) {
    return state.users.auth.userId;
  }
};

export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;

export default usersReducer;
