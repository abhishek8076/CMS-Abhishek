import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { Banner } from '../../components/Banner/Banner'

export const Extra = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div>
            <Banner />
        </div>
       
      </div>
    </div>
  )
}
