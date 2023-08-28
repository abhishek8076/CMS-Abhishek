import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Navigate } from "react-router";
import Protected from "./Apis/PrivateRoute";
// import { useHistory } from 'react-router';


import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";
import { Cms } from "./pages/CMS/Cms";
import { Extra } from "./pages/extra/Extra";
import { IndexWhatsNew } from "./components/WhatsNew/IndexWhatsNew";
import { IndexBanner } from "./components/Banner/IndexBanner";
import { WhatsNewTable } from "./components/WhatsNew/WhatsNewTable";
import { Banner } from "./components/Banner/Banner";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  // const LocalStorageData = localStorage.getItem("token");
  const LocalStorageData =localStorage.getItem("token");
  const userData = localStorage.getItem("userData");
  const role = userData ? userData.role : null;

  return (
    // <div className={darkMode ? "app dark" : "app"}>
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path="/login" element={<Login />} />


    //       <Route path="/" element={<Home />} />
    //       <Route path="cms" element={<Cms />} />
    //       <Route path="whatsnew"  >
    //         <Route index element={<IndexWhatsNew />} />
    //         <Route path="whatsnewtable" element={<WhatsNewTable />} />


    //       </Route>
    //       <Route path="Banner" element={<IndexBanner />} />
    //       <Route path="extra" element={<Extra />} />
    //       <Route path="users">
    //         <Route index element={<List />} />
    //         <Route path="single/:id" element={<Single />} />
    //         <Route
    //           path="new"
    //           element={<New />}
    //         />
    //       </Route>
    //       <Route path="products">
    //         <Route index element={<List />} />
    //         <Route path=":productId" element={<Single />} />
    //         <Route
    //           path="new"
    //           element={<New />}
    //         />
    //       </Route>
    //     </Routes>
    //   </BrowserRouter>
    // </div>
  
  <div className={darkMode ? "app dark" : "app"}>
 <Router>
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/users" element={<List />} />
        <Route path="/cms" element={<Cms />} />
        {/* {role === "2" && (
          <Protected path="/dashboard" element={<Home />} />
        )} */}
        {/* {role === "user" && (
          <Protected path="/user" element={<UserDashboard />} />
        )} */}
        {/* Other routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
     
    </Router>
  </div>
  
  );
}

export default App;
