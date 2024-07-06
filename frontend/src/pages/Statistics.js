import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../routes";
import { ToastContainer, toast } from "react-toastify";
import "../assets/css/homePage.css";
import AdminSideBar from "../components/AdminSideBar";
import StaffBackToTop from "../components/StaffBackToTop"
export default function Statistics() {
  const navigate = useNavigate();

  useEffect(() => {

    const checkAuthentication = () => {
      const userRole = localStorage.getItem("userRole");
      if (!userRole || userRole !== "ROLE_ADMIN") {
          navigate('/');
      }
    };
    checkAuthentication();

  }, []);

  return (
    <div>
      <AdminHeader />

      <div className="manage-content">
        <AdminSideBar />

        <div className="manage-content-detail">
          Statistics
        </div>
      </div>
      <StaffBackToTop />
    </div>
  );
}
