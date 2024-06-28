import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { routes } from "../routes";
import StaffHeader from "../components/StaffHeader";
import { ToastContainer, toast } from "react-toastify";
import Switch from 'react-switch';
import instance from "../services/auth/customize-axios";
import {

} from "../services/auth/UsersService";
import StaffSideBar from "../components/StaffSideBar";
import "../assets/css/chat.css";

export default function StaffChat() {

    const navigate = useNavigate();

    useEffect(() => {

        const checkAuthentication = () => {
          const userRole = localStorage.getItem("userRole");
          if (!userRole || userRole !== "ROLE_STAFF") {
              navigate('/');
          }
        };
        checkAuthentication();

       
    }, []);

    

    return (
      <div>
        <StaffHeader/>

        <div className="manage-content">
            <StaffSideBar/>    

            <div className="staff-chat">  


                <div className="staff-chatbox">
                    {/* chat data */}
                </div> 

                <div className="staff-input">
                    <input type="text" placeholder="" />
                    <button type="button">Gửi</button>
                </div>

            </div>    
               
        </div>
      </div>
    );
  }