import React from "react";

const Header = ({ handleEditor }) => {
  return (
    <div className="d-flex justify-content-between m-3">
      <h2>Все проекты</h2>
      <button onClick={handleEditor} className="btn btn-info rounded-pill">
        Создать проект
      </button>
    </div>
  );
};

export default Header;
