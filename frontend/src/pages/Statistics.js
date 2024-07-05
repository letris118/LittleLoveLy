import React, { useEffect, useState } from "react";
import StaffHeader from "../components/StaffHeader";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../routes";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import { articles, brands, products } from "../services/auth/UsersService";
import BrandPresentation from "../components/BrandPresentation";
import "../assets/css/homePage.css";
import ProductPresentation from "../components/ProductPresentation";
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
      <StaffHeader />

      <div className="manage-content">
        <AdminSideBar />

        <div className="manage-content-detail">
          Statistics
        </div>
      </div>
    </div>
  );
}
