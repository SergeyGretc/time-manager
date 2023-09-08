import React from "react";

import { Route } from "react-router-dom";

import MainPage from "./pages/MainPage";
import EditForm from "./pages/editForm";
import Login from "./pages/LoginPage";
import LogOut from "./LogOut";
import Projects from "./ProjectsList";
import AnaliseList from "./pages/AnaliseList";
import MainNavbar from "./MainNavbar";
import AppLoader from "./components/hoc/appLoader";
import EditUserProfile from "./pages/EditUserProfile";
import EditorForOneTask from "./pages/EditorForOneTask";
import { GlobalStyles } from "./utils/globalStyles";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./utils/themes";
import { useDarkMode } from "./hooks/useDarkMode";
import Toggle from "./Toogle";

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
            <Route exact path="/edit/:id?" component={EditorForOneTask} />
            <Route exact path="/login/:type?" component={Login} />
            <Route path="/logout" component={LogOut} />
            <Route exact path="/createtask" component={EditForm} />
          </>
        </ThemeProvider>
      </AppLoader>
    </div>
  );
}

export default App;
