import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

import api from '../../utils/apiUrl.json';
import apiClient from '../../services/AxiosApi';

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Banner.scss'; // Import custom SCSS

export const BannerTable = () => {
  const [repos, setRepos] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);
  const [posts, setPosts] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(api.getimage);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const deleteRow = async (id) => {
    try {
      await apiClient.delete(`/api/Slider/${id}`);
      setData(prevPosts => prevPosts.filter(item => item.id !== id));
      setPostIdToDelete(null);
      setShowPopup(false);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  }
  
  const handleDeleteClick = (id) => {
    setPostIdToDelete(id);
    setShowPopup(true);
  };
  
  const handleCancelDelete = () => {
    setPostIdToDelete(null);
    setShowPopup(false);
  };
  const storedUserString = localStorage.getItem("user");
  const user = JSON.parse(storedUserString);

  return (
    <>
      <div className="datatable">
        <div className="datatableTitle" style={{ paddingTop: 20, paddingLeft: 10 }}>
          <h2>Add New User</h2>
        </div>
      </div>
      <div className="container">
        <TableContainer component={Paper} className="table my-4">
          <Table className="table table-bordered" aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                {user.r_usertype==2 &&(
                <TableCell>Action</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, i) => (
                <TableRow key={item.u_id}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell><img className='getImage' src={item.imgpath} alt={item.u_content} /></TableCell>
                  <TableCell>{item.u_content}</TableCell>
                  {user.r_usertype==2 &&(
                  <TableCell>
                    
                    <Button  onClick={() => handleDeleteClick(item.u_id)}>
                    <DeleteIcon/>
                      Delete
                    </Button>
                    
                  </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {showPopup && (
          <div className="popup">
            <p>Do you want to delete this post?</p>
            <button className="btn btn-danger" onClick={() => deleteRow(postIdToDelete)}>Yes</button>
            <button className="btn btn-secondary" onClick={handleCancelDelete}>No</button>
          </div>
        )}
      </div>
    </>
  );
};
