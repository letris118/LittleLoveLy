import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SearchPresentation from "../components/SearchPresentation";
import Sidebar from "../components/SideBar";

export default function SearchProduct() {
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
            <div className="content-search-row">
              <SearchPresentation />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
