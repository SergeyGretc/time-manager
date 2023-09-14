import React, { useState } from "react";

import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import { getCurrentUserId, getUserById } from "../../store/users";
const NavProfile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const currentUserId = useSelector(getCurrentUserId());

  const currentUser = useSelector(getUserById(currentUserId));

  const toggleMenu = () => {
    setIsOpen((prevState) => !prevState);
  };

  if (currentUser) {
    return (
      <div className="dropdown" onClick={toggleMenu}>
        <div className="btn dropdown-toggle d-flex align-items-center">
          {currentUser.name}
          <img
            src="https://s1.iconbird.com/ico/0612/customicondesignoffice2/w256h2561339870331Man256.png"
            alt="Картинка"
            className="img-responsive round-circle"
            height="40px"
          />
        </div>
        <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
          <Link to={`/users/${currentUserId}`} className="dropdown-item">
            Profile
          </Link>
          <Link to={`/logout`} className="dropdown-item">
            Logout
          </Link>
        </div>
      </div>
    );
  } else return "Loading...";
};
export default NavProfile;
