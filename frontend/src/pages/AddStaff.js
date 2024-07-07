import React, { useEffect, useState } from "react";
import { routes } from "../routes";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import { ToastContainer, toast } from "react-toastify";
import {

} from "../services/auth/UsersService";
import AdminSideBar from "../components/AdminSideBar";
import "../assets/css/manage.css";
import StaffBackToTop from "../components/StaffBackToTop";

export default function AddStaff() {
    const navigate = useNavigate();
    useEffect(() => {
        const checkAuthentication = () => {
          const userRole = localStorage.getItem("userRole");
          if (!userRole || userRole !== "ROLE_ADMIN") {
            navigate('/');
          }
        }
        checkAuthentication();
    
        
      }, [navigate]);
    return (
        <div>
            <AdminHeader />
            <div className="manage-content">
                <AdminSideBar />
                <div className="add-update-content-detail">

                </div>
            </div>
            <StaffBackToTop />
        </div>
    );
}