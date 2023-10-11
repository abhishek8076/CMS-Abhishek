import React from 'react'
import {WhatsNew} from './WhatsNew'
  import { WhatsNewTable } from './WhatsNewTable';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import './whatsnew.scss'

export const IndexWhatsNew = () => {
  return (
    <div className="list">
    <Sidebar />
    <div className="listContainer">
      <Navbar />
      <div className="container">
          <WhatsNew />
        
      </div>
     
    </div>
  </div>
  )
}
