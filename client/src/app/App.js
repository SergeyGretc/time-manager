import React from "react";

import { Route } from "react-router-dom";

import MainPage from "./components/features/MainPage";
import CreateTask from "./components/features/CreateTask";
import Login from "./components/features/Login";
import LogOut from "./components/features/LogOut";
import Projects from "./components/features/Projects";
import AnaliseList from "./components/features/AnaliseList";
import MainNavbar from "./components/MainNavbar";
import AppLoader from "./hoc/AppLoader";
import EditUserProfile from "./components/features/EditUserProfile";
import EditTask from "./components/features/EditTask";
import { GlobalStyles } from "./styles/globalStyles";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/themes";

import { useDarkMode } from "./hooks/useDarkMode";
import Toggle from "./components/Toogle";

function App() {
  const [theme, themeToggler, mountedComponent] = useDarkMode();

  const themeMode = theme === "light" ? lightTheme : darkTheme;
  if (!mountedComponent) return <div />;

  return (
    <div className="App">
      <AppLoader>
        <MainNavbar />
        <Toggle theme={theme} toggleTheme={themeToggler} />
        <ThemeProvider theme={themeMode}>
          <GlobalStyles />
          <>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/analise" component={AnaliseList} />
            <Route exact path="/projects" component={Projects} />
            <Route exact path="/users/:id?" component={EditUserProfile} />
            <Route exact path="/edit/:id?" component={EditTask} />
            <Route exact path="/login/:type?" component={Login} />
            <Route path="/logout" component={LogOut} />
            <Route exact path="/createtask" component={CreateTask} />
          </>
        </ThemeProvider>
      </AppLoader>
    </div>
  );
}

export default App;
