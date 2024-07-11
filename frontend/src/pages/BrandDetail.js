import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/brandDetail.css";
import BrandDetailPresentation from "../components/BrandDetailPresentation";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";

export default function BrandDetail() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = () => {
      const userRole = localStorage.getItem("userRole");
      if (userRole === "ROLE_STAFF" || userRole === "ROLE_ADMIN") {
        navigate("/");
      }
    };
    checkAuthentication();
  }, [navigate]);
  return (
    <div>
      <Header />
      <div className="content">
        <Sidebar
          role={localStorage.getItem("userRole")}
          customerName={localStorage.getItem("name")}
          customerPoint={localStorage.getItem("point")}
        />
        <div className="content-detail">
          <div className="content-display ">
            <BrandDetailPresentation />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
