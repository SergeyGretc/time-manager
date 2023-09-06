// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { userService } from "./user.service";

// import { toast } from "react-toastify";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import { useAuth } from "./userAuth";
// import { nanoid } from "nanoid";
// import { projectService } from "./project.service";

// import { getUserById, getCurrentUserId } from "./store/users";
// import { useSelector } from "react-redux";

// const ProjectContext = React.createContext();

// export const useProjects = () => {
//   return useContext(ProjectContext);
// };

// export const ProjectProvider = ({ children }) => {
//   const [projects, setProjects] = useState([]);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const history = useHistory();
//   // const currentUserId = useSelector(getCurrentUserId());
//   // const currentUser = useSelector(getUserById(currentUserId));
//   const currentUserId = 1;
//   const currentUser = "serege";
//   useEffect(() => {
//     getAllProjects();
//   }, []);

//   async function createProject(data) {
//     const project = {
//       ...data,
//       userId: currentUserId,
//       _id: nanoid(),
//     };
//     try {
//       const { content } = await projectService.createProject(project);
//       console.log(content);
//     } catch (error) {
//       errorCatcher(error);
//     }
//   }
//   async function getAllProjects() {
//     try {
//       const { content } = await projectService.getAllProjects();

//       setProjects(content);

//       return content;
//     } catch (error) {
//       errorCatcher(error);
//     }
//   }
//   function errorCatcher(error) {
//     const { message } = error.response.data;
//     setError(message);
//   }
//   useEffect(() => {
//     if (error !== null) {
//       toast(error);
//       setError(null);
//     }
//   }, []);
//   return (
//     <ProjectContext.Provider
//       value={{ projects, createProject, getAllProjects }}
//     >
//       {children}
//     </ProjectContext.Provider>
//   );
// };
