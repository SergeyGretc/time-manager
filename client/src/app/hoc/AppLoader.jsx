import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsLoggedIn,
  getUsersLoadingStatus,
  loadUsersList,
} from "../store/users";
import { loadProjectsList } from "../store/projects";
import localStorageService from "../services/localStorageService";
import { loadAnaliseList } from "../store/analise";

const AppLoader = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(getIsLoggedIn());
  const usersStatusLoading = useSelector(getUsersLoadingStatus());

  useEffect(() => {
    dispatch(loadUsersList());

    if (isLoggedIn) {
      const userId = localStorageService.getUserId();
      dispatch(loadProjectsList(userId));
      dispatch(loadAnaliseList(userId));
    }
  }, [isLoggedIn, dispatch]);
  if (usersStatusLoading) return "Loading";
  return children;
};
export default AppLoader;
