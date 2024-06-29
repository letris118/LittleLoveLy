import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../routes";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import { articles, brands, products } from "../services/auth/UsersService";
import BrandPresentation from "../components/BrandPresentation";
import "../assets/css/homePage.css";
import ProductPresentation from "../components/ProductPresentation";
import AdminSideBar from "../components/AdminSideBar";

export default function ManageMember() {
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
          Member
        </div>
      </div>
    </div>
  );
}
