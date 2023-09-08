import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import NavProfile from "./NavProfile";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "./store/users";

const MainNavbar = () => {
  const isLoggedIn = useSelector(getIsLoggedIn());

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary "
        style={{ backgroundColor: "#e3f2fd" }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Главная
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/projects"
                    >
                      Проекты
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      aria-current="page"
                      to="/analise"
                    >
                      Аналитика
                    </Link>
                  </li>
                </>
              )}
            </ul>
            {isLoggedIn ? (
              <NavProfile />
            ) : (
              <Link className="nav-link active" aria-current="page" to="/login">
                Войти
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default MainNavbar;
