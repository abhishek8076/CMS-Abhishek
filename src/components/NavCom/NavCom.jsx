import axios from 'axios';
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import './NavCom.scss';
import { Card, TextField,MenuItem } from '@mui/material';
import { Container,InputLabel,FormControl ,Select} from '@mui/material';


export const NavCom = () => {
 const [isVisible, setIsVisible] = useState(false);

  const changeHandler = (e) => {
    if (e.target.value === 'country') {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  return (
    <div>
    <div className="home">
       <Sidebar className='nav' style={{}} />
       <div className="homeContainer">
       <Navbar />
       <div>
       <Card>
        <Container>
<h1 className='head'>Navigation Bar Created</h1>
<hr/>
<div class="row">
    <h4>Menu Title</h4>
    <div class="col">
    <FormControl >
  <InputLabel id="demo-simple-select-label"></InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    // value={age}
      // onChange={handleChange}
  >
    <MenuItem value={1}>menu</MenuItem>
    <MenuItem value={2}>Sub-menu</MenuItem>
    <MenuItem value={3}>sub-sub-menu</MenuItem>
  </Select>
</FormControl>
<div>
        <select onChange={changeHandler}>
          <option value="global">Global</option>
          <option value="country">Country</option>
        </select>
        <br />
        <br />
        {isVisible ? (
          <select>
            <option value="ap">AP</option>
            <option value="ts">TS</option>
          </select>
        ) : null}
      </div>
        </div>
        </div>
        </Container>
       </Card>
       </div>
       </div>
       </div>
     </div>

  )
}
