import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegistrationForm from "../RegistrationForm";

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === "register" ? type : "login"
  );
  const toggleFormType = (params) => {
    setFormType((prevState) =>
      prevState === "register" ? "login" : "register"
    );
  };

  return (
    <div>
      {formType === "register" ? (
        <>
          <RegistrationForm />
          <p>
            Already have account?{" "}
            <a role="button" onClick={toggleFormType}>
              {" "}
              Sign In
            </a>
          </p>
        </>
      ) : (
        <>
          <LoginForm />
          <p>
            Dont have account?{" "}
            <a role="button" onClick={toggleFormType}>
              {" "}
              Sign Up
            </a>
          </p>
        </>
      )}
    </div>
  );
};

export default Login;
