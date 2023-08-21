import React ,{useState,useEffect}from 'react';
import { Table,
    TableBody, 
    TableCell,
     TableContainer,
      TableHead,
       TableRow, 
       Paper,
      } from '@mui/material';
      import {userRows} from '../../datatablesource.js'
import Sidebar from '../sidebar/Sidebar.jsx';
import Navbar from '../navbar/Navbar.jsx';
import {Button} from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import apiClient from '../../services/AxiosApi.jsx'


export const WhatsNewTable = () => {
  const [data, setData] = useState([]);
  //  const [catId, setCatId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get('/demo');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>      
      <div className="list">
    <Sidebar />
    <div className="listContainer">
      <Navbar/>
      <div className="containertable">
      <div>
        <Button
          type="button"
         
          className="view-button"
        >
          <Link to="/whatsnew"  className="view-button" >
            <ArrowBackIcon/>Back
        </Link>
        </Button>
        </div> 
      <TableContainer component={Paper} className="table">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
        <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Mobile No</TableCell>
          <TableCell>Address</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        
        {userRows.map((item,i) => (
          
          <TableRow key={item.id}>
             <TableCell>{i+1}</TableCell>
            <TableCell>{item.username}</TableCell>
            <TableCell>{item.age}</TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell>{item.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer></div>
  </div>
  </div>
  </div>
  )
}
