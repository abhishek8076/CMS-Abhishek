import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";

import { BrowserRouter } from 'react-router-dom';

import { BrowserRouter as Router } from 'react-router-dom';


ReactDOM.render(
  
  <React.StrictMode>
    <DarkModeContextProvider>
 
      <App />
     
    </DarkModeContextProvider>
  </React.StrictMode>
  ,


//using routes file
  //   <React.StrictMode>
  //   <DarkModeContextProvider>
  //   <BrowserRouter>
  //     <App />
  //     </BrowserRouter>
  //   </DarkModeContextProvider>
  // </React.StrictMode>,
  document.getElementById("root")
);
