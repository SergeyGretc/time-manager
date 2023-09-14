import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === "register" ? type : "login"
  );
  const toggleFormType = () => {
    setFormType((prevState) =>
      prevState === "register" ? "login" : "register"
    );
  };

  return (
    <div>
      {formType === "register" ? (
        <>
          <RegistrationForm />
          <div className="d-flex justify-content-center align-items-center">
            <p className="mb-0">Already have account?</p>
            <button className="btn btn-info" onClick={toggleFormType}>
              Sign In
            </button>
          </div>
        </>
      ) : (
        <>
          <LoginForm />
          <div className="d-flex justify-content-center align-items-center">
            <p className="mb-0">Dont have account? </p>
            <button className="btn btn-info" onClick={toggleFormType}>
              Sign Up
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
