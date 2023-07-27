import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import NoteViewer from '../../components/Edit/Edit';

export const Cms = () => {
  return (
    <div>
   <div className="home">
      <Sidebar className='nav' style={{}} />
      <div className="homeContainer">
      <Navbar />
           <NoteViewer/>
      </div>
      </div>
    </div>
  )
}
