import React,{useState,useEffect} from 'react';
import apiClient from '../../../services/AxiosApi';
import apis from '../../../utils/apiUrl.json'
import { Editmenu } from './Editmenu';
import { Editsubmenu } from './Editsubmenu';
import Sidebar from '../../sidebar/Sidebar';
import Navbar from '../../navbar/Navbar';
import { useParams } from 'react-router-dom';

 export const Index  = () => {
    const [data,setData] = useState([])
    const {id}= useParams()
    useEffect(() => {
        async function fetchData2() {
          try {
           
            const response = await apiClient.get(apis.getmenudatabyid+id);
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
     {data.u_submenu_id===0&&(
        <Editmenu/>
     )}
     {data.u_submenu_id!==0&&(
        <Editsubmenu/>
     )}
      </div>
      </div>
    </div>
  )
}


