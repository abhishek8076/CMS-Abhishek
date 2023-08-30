import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import logo from "../../assets/logo.jpg"
import { Link } from "react-router-dom";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const storedUserString = localStorage.getItem('user');
  const user = JSON.parse(storedUserString)
  // const user = JSON.parse( localStorage.getItem('user'))
  // console.log(user);
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          {/* <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon /> */}
          <p className="name">Ornate TechnoServices Pvt Ltd</p>
        </div>
        {/* <p>{a.r_name}</p> */}

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
            <div className='profile'>
              <img
                src={logo}
                alt=""
                className="avatar"
              />
              <div className="options">
              <Link to='/profile' style={{textDecoration: 'none'}}>
                  <span>Profile</span>
                </Link>
                <Link to='/' style={{textDecoration: 'none'}}>
                  <span>Logout</span>
                </Link>
              </div>
            </div>
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
