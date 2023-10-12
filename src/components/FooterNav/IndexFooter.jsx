import React, { useState } from "react";
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { FooterDesc } from './FooterDesc';
import { FooterService } from "./FooterService";
import { FooterOffice } from "./FooterOffice";
import { FooterPage } from "./FooterNav";

export const IndexFooter = () => {
  const [activeButton, setActiveButton] = useState("button1"); // Set "button1" as the initial active button

  const handleButtonClick = (buttonId) => {
    setActiveButton(buttonId);
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div className="container">
          <div>
            <button onClick={() => handleButtonClick("button1")}>Description</button>
            <button onClick={() => handleButtonClick("button2")}>Services</button>
            <button onClick={() => handleButtonClick("button3")}>Address</button>
            <button onClick={() => handleButtonClick("button4")}>Linking</button>

            <div style={{ display: activeButton === "button1" ? "block" : "none" }}>
            <FooterDesc />
          
            </div>
            <div style={{ display: activeButton === "button2" ? "block" : "none" }}>
            <FooterService />
              
            </div>
            <div style={{ display: activeButton === "button3" ? "block" : "none" }}>
            <FooterOffice />
            </div>
            <div style={{ display: activeButton === "button4" ? "block" : "none" }}>
            <FooterPage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
