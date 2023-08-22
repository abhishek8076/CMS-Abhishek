import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { 
    TableHead
    } from '@mui/material';
    import api from '../../utils/apiUrl.json'

 export const BannerTable = () => {
  const [repos, setRepos] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedRepo, setSelectedRepo] = useState(null);

  const [data, setData] = useState([]);
  //  const [catId, setCatId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(api.getimage);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDeleteClick = (repo) => {
    setSelectedRepo(repo);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    // Simulate deletion action
    const updatedRepos = repos.filter(repo => repo.name !== selectedRepo.name);
    setRepos(updatedRepos);

    // Close the delete dialog
    setOpenDeleteDialog(false);
  };

  const handleDeleteCancel = () => {
    // Close the delete dialog
    setOpenDeleteDialog(false);
  };

  return (
    <>
    
    <div className="datatable">
      <div className="datatableTitle"style={{paddingTop: 20, paddingLeft: 10}}>
        <h2>Add New User</h2>
        
      </div>
      </div>
      <div className="container">
          <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item,i) => (
            <TableRow key={item.users_id}>
               <TableCell>{i+1}</TableCell>
              <TableCell><img className='getImage' src={item.imgpath} alt={item.u_content}/></TableCell>
              <TableCell>{item.u_content}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
    </>
  );
};

// export default GitHubRepoTable;
