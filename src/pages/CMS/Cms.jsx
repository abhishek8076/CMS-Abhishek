import React ,{useState} from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import NoteViewer from '../../components/Edit/Edit';
import Whats_New from '../../components/WhatsNew/WhatsNew';
import './Cms.scss';
import { Container } from 'react-bootstrap';
import Grid from '@mui/material/Unstable_Grid2';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const Cms = () => {
  const [menu, setMenu] = React.useState('');
  const [showDiv, setShowDiv] = useState(false);

  const handleChange = (event) => {
    setMenu(event.target.value);
  };
//to the div and hide div
  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setShowDiv(selectedValue === 'option1');
  };
  return (
    <div>
   <div className="home">
      <Sidebar className='nav' style={{}} />
      <div className="homeContainer">
      <Navbar />
      <h1>CMS</h1>
      <Container>
      <Grid container spacing={2}>
  <Grid >
   <h4>Menu List</h4>
  </Grid>
  <Grid >
  <FormControl sx={{ minWidth: 200}} size="small">
      <InputLabel id="demo-select-small-label">Menu</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={menu}
        label="menu"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Main Menu</MenuItem>
        <MenuItem value={20}>Sub Menu</MenuItem>
        <MenuItem value={30}>Sub Sub menu</MenuItem>
      </Select>
    </FormControl>
  </Grid>
  <Grid xs={6} md={4}>
   
  </Grid>
  <Grid xs={6} md={8}>
  
  </Grid>
</Grid>
      </Container>
      </div>
      </div>
    </div>
  )
}
