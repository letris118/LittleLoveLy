import AdminHeader from "../components/AdminHeader";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import AdminSideBar from "../components/AdminSideBar";

export default function UpdateStaff() {

    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const checkAuthentication = () => {
            const userRole = localStorage.getItem("userRole");
            if (!userRole || userRole !== "ROLE_ADMIN") {
                navigate("/");
            }
        };
        checkAuthentication();

       
       
    }, [navigate, location]);
    return (
        <div>
            <AdminHeader/>
            <div className="manage-content">
        <AdminSideBar />
        </div>
        </div>
    );
}