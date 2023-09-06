// import React, { useEffect, createContext, useState, useContext } from "react";
// import Styles from "./styles.css";

// const StorageKey = "features-color-theme";
// const supportedThemes = {
//   light: "light",
//   dark: "dark",
// };

// const ThemeContext = React.createContext();

// const useTheme = () => {
//   const context = useContext(ThemeContext);

//   if (!context) {
//     throw new Error(
//       'You can use "useTheme" hook only within a <ThemeProvider> component.'
//     );
//   }

//   return context;
// };

// const getTheme = () => {
//   let theme = localStorage.getItem(StorageKey);

//   if (!theme) {
//     localStorage.setItem(StorageKey, "light");
//     theme = "light";
//   }

//   return theme;
// };

// const Theme = ({ children }) => {
//   const [theme, setTheme] = useState(getTheme);

//   useEffect(() => {
//     localStorage.setItem(StorageKey, theme);
//     document.documentElement.setAttribute("data-theme", theme);
//   }, [theme]);

//   return (
//     <ThemeContext.Provider
//       value={{
//         theme,
//         setTheme,
//         supportedThemes,
//       }}
//     >
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// Theme.SimpleToggler = function SimpleToggler() {
//   const { theme, setTheme } = useTheme();

//   const handleSwitchTheme = () => {
//     if (theme === "dark") {
//       setTheme("light");
//     } else {
//       setTheme("dark");
//     }
//   };

//   return (
//     <div className={Styles.simpleToggler} onClick={handleSwitchTheme}>
//       <div className={Styles.ball} data-theme={theme} />
//     </div>
//   );
// };

// export { useTheme };
// export default Theme;
