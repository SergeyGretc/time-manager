// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { userService } from "./user.service";

// import { toast } from "react-toastify";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import { useAuth } from "./userAuth";
// import { nanoid } from "nanoid";
// import { analiseService } from "./analise.service";

// const AnaliseProjectContext = React.createContext();

// export const useAnaliseProjects = () => {
//   return useContext(AnaliseProjectContext);
// };

// export const AnaliseProjectProvider = ({ children }) => {
//   const [analiseProjects, setAnaliseProjects] = useState([]);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const history = useHistory();
//   const { currentUser } = useAuth();
//   useEffect(() => {
//     getAllAnaliProjects();
//   }, []);

//   async function createAnaliseProject(data) {
//     const analiseProject = {
//       ...data,
//       userId: currentUser._id,
//       analiseId: nanoid(),
//     };
//     try {
//       const { content } = await analiseService.createAnalisePoject(
//         analiseProject
//       );
//     } catch (error) {
//       errorCatcher(error);
//     }
//   }
//   async function getAllAnaliProjects() {
//     try {
//       const { content } = await analiseService.getAllAnaliseProjects();

//       setAnaliseProjects(content);

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
//     <AnaliseProjectContext.Provider
//       value={{ analiseProjects, createAnaliseProject, getAllAnaliProjects }}
//     >
//       {children}
//     </AnaliseProjectContext.Provider>
//   );
// };
