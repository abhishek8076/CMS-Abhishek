import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

export const Protected = ({ component: Component, ...rest }) => {
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

 ;
