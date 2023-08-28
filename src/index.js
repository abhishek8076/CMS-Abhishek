import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";

import { BrowserRouter } from 'react-router-dom';

import { BrowserRouter as Router } from 'react-router-dom';


ReactDOM.render(
  
  <React.StrictMode>
    <DarkModeContextProvider>
<<<<<<< HEAD
    
      <App />
      
=======
 
      <App />
     
>>>>>>> 6e16e2578788b6383a775f19c90d71462582911e
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
