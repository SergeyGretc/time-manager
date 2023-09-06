// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import userService from "./user.service";
// import localStorageService from "./localStorageService";
// import { toast } from "react-toastify";
// import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import config from "./config.json";
// export const httpAuth = axios.create({
//   baseURL: config.apiEndpoint + "/auth/",
//   params: {
//     key: process.env.REACT_APP_FIREBASE_KEY,
//   },
// });

// const AuthContext = React.createContext();
// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState();
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const history = useHistory();

//   function errorCatcher(error) {
//     const { message } = error.response.data;
//     setError(message);
//   }
//   async function logIn({ email, password }) {
//     try {
//       const { data } = await httpAuth.post(`signInWithPassword`, {
//         email,
//         password,
//         returnSecureToken: true,
//       });
//       console.log(data);
//       localStorageService.setTokens(data);
//       await getUserData();
//       console.log(currentUser);
//     } catch (error) {
//       errorCatcher(error);
//       const { code, message } = error.response.data.error;
//       console.log(code, message);
//       if (code === 400) {
//         if (message === "INVALID_PASSWORD") {
//           throw new Error("Email или пароль введены неверно");
//         }
//       }
//     }
//   }
//   function logOut() {
//     localStorageService.removeAuthData();
//     setCurrentUser(null);
//     history.push("/");
//   }
//   async function signUp({ email, password, ...rest }) {
//     try {
//       const { data } = await httpAuth.post(`signUp`, {
//         email,
//         password,
//         returnSecureToken: true,
//         ...rest,
//       });
//       localStorageService.setTokens(data);

//       // await createUser({ userId: data.userId, email, ...rest });
//       console.log(data);
//     } catch (error) {
//       errorCatcher(error);
//       const { code, message } = error.response.data.error;
//       console.log(code, message);
//       if (code === 400) {
//         if (message === "EMAIL_EXISTS") {
//           const errorObject = {
//             email: "Пользователь с таким Email уже существует",
//           };
//           throw errorObject;
//         }
//       }
//     }
//   }
//   async function createUser(data) {
//     try {
//       const { content } = await userService.create(data);

//       setCurrentUser(content);
//       console.log(content);
//     } catch (error) {
//       errorCatcher(error);
//     }
//   }
//   async function getUserData() {
//     try {
//       const { content } = await userService.getCurrentUser();
//       setCurrentUser(content);
//       console.log(content);
//       console.log(currentUser);
//     } catch (error) {
//       errorCatcher(error);
//     } finally {
//       setIsLoading(false);
//     }
//   }
//   useEffect(() => {
//     if (localStorageService.getAccessToken()) {
//       getUserData();
//     } else {
//       setIsLoading(false);
//     }
//   }, []);
//   useEffect(() => {
//     if (error !== null) {
//       toast(error);
//       setError(null);
//     }
//   }, []);
//   return (
//     <AuthContext.Provider value={{ signUp, logIn, currentUser, logOut }}>
//       {!isLoading ? children : "Loading..."}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
