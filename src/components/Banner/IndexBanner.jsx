import React from 'react'
import  {Banner} from './Banner'
import  {BannerTable}  from './BannerTable'
import Sidebar from '../sidebar/Sidebar'
import Navbar from '../navbar/Navbar'
import { Card, Container } from '@mui/material';
import './Banner.scss';

export const IndexBanner = () => {
  return (
    <div className="list">
    <Sidebar />
    <div className="listContainer">
      <Navbar />
      <div className='index'>
        <Container className='fixed-width'>
          
          <Banner/>
          
          </Container>
          <Container className='second-container'>
          <Card>
          <BannerTable/>
          </Card>
          </Container>
          
      </div>
     
    </div>
  </div>
  )
}
