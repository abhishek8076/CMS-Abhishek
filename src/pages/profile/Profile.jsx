import React, { useState } from 'react'
// import { getUserProfile } from 'src/services/user';
import Card from "@mui/material/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import avtar from '../../assets/avtar.png'

const Profile = () => {
    const storedUserString = localStorage.getItem('user');
    const user = JSON.parse(storedUserString)
    console.log(user)
    return (
        <>
         <div>
      <div className="home">
        <Sidebar className='nav' style={{}} />
        <div className="homeContainer">
          <Navbar />
            <div className="container">
                <div className="row mt-5">
                    <div className="col-lg-4">
                        <div className="card mb-4">
                            <div className="card-body text-center">
                                <img 
                                // src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp" alt="avatar"
                                        src={avtar}
                                        alt='avtar'
                                    className="rounded-circle img-fluid" style={{ "width": "150px" }} />
                                <h5 className="my-3">{user.r_name}</h5>
                                <p className="text-muted mb-1">{user.usertype}</p>
                                <p className="text-muted mb-4">{user.r_email}</p>
                            </div>
                        </div>
                    </div>
                    {/* <div className="mt-5"> */}
                    <div className="col-lg-8">
                        <div className="card mb-4">
                            <div className='card-header'><h3>Profile</h3></div>
                            <div className="card-body">

                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">First Name</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{user.r_name}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">User Name</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{user.r_name}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Email</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{user.r_email}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Mobile</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{user.r_name}</p>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-sm-3">
                                        <p className="mb-0">Address</p>
                                    </div>
                                    <div className="col-sm-9">
                                        <p className="text-muted mb-0">{user.r_name}</p>
                                    </div>
                                </div>
                               
                               
                            </div>

                        </div>

                    </div>
                </div>
            </div>
            </div>
            </div>
            </div>
        </>
    );
}
export default Profile;