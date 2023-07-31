import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import NoteViewer from '../../components/Edit/Edit';
import Whats_New from '../../components/WhatsNew/WhatsNew';

export const Cms = () => {
  return (
    <div>
   <div className="home">
      <Sidebar className='nav' style={{}} />
      <div className="homeContainer">
      <Navbar />
      <Whats_New/>
           <NoteViewer/>
      </div>
      </div>
    </div>
  )
}
