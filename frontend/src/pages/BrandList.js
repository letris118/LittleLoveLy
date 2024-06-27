import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { brands } from "../services/auth/UsersService";
import BrandListPresentation from "../components/BrandListPresentation";
import Breadcrumb from "../components/Breadcrum";
import Footer from "../components/Footer";
import Sidebar from "../components/SideBar";
import "../assets/css/brandPresentation.css";

export default function BrandList() {
  const [brandList, setBrandList] = useState([]);
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        let response = await brands();
        if (response) {
          setBrandList(response);
        } else {
          setBrandList([]);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
        setBrandList([]);
      }
    };

    fetchBrands();
  }, []);

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
          <Breadcrumb value="Tất cả thương hiệu" />
          <div className="content-display ">
            <div className="content-row-1">
              <div className="row-1-top" style={{ width: "100%" }}>
                <h4>Tất cả thương hiệu</h4>
              </div>
              <div className="row-list-bottom">
                <BrandListPresentation brands={brandList} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
