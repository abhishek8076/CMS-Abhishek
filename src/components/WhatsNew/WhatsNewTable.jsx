import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import apiClient from '../../services/AxiosApi.jsx';
import apis from '../../utils/apiUrl.json';

export const WhatsNewTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(apis.getwhatsnew);
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
        {/* Sidebar and Navbar components */}
      </div>
      <div className="listContainer">
        <div className="containertable">
          <div>
            <Button type="button" className="view-button">
              <Link to="/whatsnew" className="view-button">
                <ArrowBackIcon />Back
              </Link>
            </Button>
          </div>
          <div className="table-scroll">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Content Type</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item, i) => (
                    <TableRow key={item.u_id}>
                      <TableCell>{i + 1}</TableCell>
                      <TableCell>{item.u_news_tittle}</TableCell>
                      <TableCell>{item.u_contenttype}</TableCell>
                      <TableCell>{item.u_startdate}</TableCell>
                      <TableCell>{item.u_end_date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
