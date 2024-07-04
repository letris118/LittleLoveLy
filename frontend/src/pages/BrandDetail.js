import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../assets/css/brandDetail.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import { brands } from "../services/auth/UsersService";
import BrandDetailPresentation from "../components/BrandDetailPresentation";

export default function BrandDetail() {
  const brandName = useParams();
  const [brandInfo, setBrandInfo] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchBrand = async () => {
      try {
        let response = await brands();
        const brand = response.find((brand) => brand.name === brandName.name);
        console.log(brand);
        if (response) {
          setBrandInfo(brand);
        } else {
          setBrandInfo([]);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
        setBrandInfo([]);
      }
    };
    fetchBrand();
  }, []);
  return (
    <>
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
    </>
  );
}
