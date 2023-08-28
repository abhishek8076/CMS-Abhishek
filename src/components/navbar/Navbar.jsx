import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          {/* <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon /> */}
          
        </div>
        <p className="name">Ornate technoServices Pvt Ltd</p>
        <div className="items">
       
          {/* <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div> */}
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          {/* <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div> */}
          {/* <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div> */}
          {/* <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div> */}
          {/* <div className="item">
            <ListOutlinedIcon className="icon" />
          </div> */}
          <div className="item">
            <img
              //src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              src="https://static.ambitionbox.com/assets/v2/images/rs:fit:1280:960:false:false/bG9jYWw6Ly8vbG9nb3Mvb3JpZ2luYWxzL29ybmF0ZS10ZWNobm9zZXJ2aWNlcy5qcGc.png"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
