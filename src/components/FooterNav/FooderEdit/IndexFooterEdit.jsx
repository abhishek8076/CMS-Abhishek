import React,{useState,useEffect} from 'react';
import apiClient from '../../../services/AxiosApi';
import apis from '../../../utils/apiUrl.json'

import Sidebar from '../../sidebar/Sidebar';
import Navbar from '../../navbar/Navbar';
import { Navigate, useParams } from 'react-router-dom';
import { FooterDesc } from "./FooterDesEdit";
import {FooterService }from './FooterServEdit';
import {FooterOffice}  from './FooterOfficeEdit';
import  {FooterNavEdit } from './FooterNavEdit';

 export const IndexFooterEdit  = () => {
    const [data,setData] = useState([])
    const {id}= useParams()
    useEffect(() => {
        async function fetchData() {
          try {
           
            const response = await apiClient.get(apis.getfooterbyid+id);
            setData(response.data);
         
          } catch (error) {
            console.error('Error fetching user data:', error);
           
          }
        }
        fetchData();
      }, [id]);
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
      <div>
     {data.footertype===1&&(
        <FooterDesc/>
     )}
      {data.footertype===2&&(
        <FooterService/>
     )}
      {data.footertype===3&&(
        <FooterOffice/>
     )}
      {data.footertype
      ===4&&(
        <FooterNavEdit/>
     )}
      
      </div>
      </div>
    </div>
  )
}


