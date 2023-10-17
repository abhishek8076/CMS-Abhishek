import React,{useState,useEffect} from 'react';
import apiClient from '../../../services/AxiosApi';
import apis from '../../../utils/apiUrl.json'

import Sidebar from '../../sidebar/Sidebar';
import Navbar from '../../navbar/Navbar';
import { useParams } from 'react-router-dom';
import { FooterDesc } from '../FooterDesc';
import FooterService from '../FooterService';
import { FooterOffice } from '../FooterOffice';
import { FooterPage } from '../FooterNav';

 export const IndexFooterEdit  = () => {
    const [data,setData] = useState([])
    const {id}= useParams()
    useEffect(() => {
        async function fetchData2() {
          try {
           
            const response = await apiClient.get(apis.getfooterbyid+id);
            setData(response.data);
         
          } catch (error) {
            console.error('Error fetching user data:', error);
           
          }
        }
        fetchData2();
      }, [id]);
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
      <div>
     {data.u_footertype===1&&(
        <FooterDesc/>
     )}
      {data.u_footertype===2&&(
        <FooterService/>
     )}
      {data.u_footertype===3&&(
        <FooterOffice/>
     )}
      {data.u_footertype
      ===4&&(
        <FooterPage/>
     )}
     
      </div>
      </div>
    </div>
  )
}


