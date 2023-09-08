import React from "react";

const FormLayout = ({ children, title }) => {
  return (
    <div className="container mt-5 ">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4 mx-auto">
          <h2 className="text-center">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormLayout;
 