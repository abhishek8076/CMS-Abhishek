import React from "react";
import { Navigate, Route } from "react-router-dom";

const Protected = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!localStorage.getItem("token")) {
          return <Navigate to={"/"} />;
        } else {
          return <Component {...rest} {...props} />;
        }
      }}
    />
  );
};

export default Protected;
