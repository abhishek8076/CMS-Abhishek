import React, { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import logo from "../../assets/logo.jpg";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import "./navbar.scss";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { dispatch } = useContext(DarkModeContext);
  const storedUserString = localStorage.getItem("user");
  const user = JSON.parse(storedUserString);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          {/* <SearchOutlinedIcon /> */}
          <p className="name">Ornate TechnoServices Pvt Ltd</p>
        </div>

        <div className="items">
          <div className="item">
            <IconButton onClick={() => dispatch({ type: "TOGGLE" })}>
              <DarkModeOutlinedIcon className="icon" />
            </IconButton>
          </div>

          <div className="item">
            <IconButton onClick={handleMenuOpen}>
              <Avatar src={logo} alt="Profile" className="avatar" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleMenuClose}>
                <Link to="/profile" className="link" style={{textDecoration:"none"}}>
                  Profile
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Link to="/" className="link" style={{textDecoration:"none"}}>
                  Logout
                </Link>
              </MenuItem>
            </Menu>
          </div>

          <div className="item">
            <p className="username">{user.r_name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
