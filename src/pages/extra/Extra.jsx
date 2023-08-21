import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { Banner } from '../../components/Banner/Banner'
import WhatsNew from '../../components/WhatsNew/WhatsNew'
// import Footer from '../../components/Footer/Footer'
import Footer from "../../components/FooterNav/FooterNav"

export const Extra = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
       <Footer/>
      </div>
    </div>
  )
}
