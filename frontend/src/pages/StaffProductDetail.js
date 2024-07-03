import React from "react";
import StaffHeader from "../components/StaffHeader";
import StaffSideBar from "../components/StaffSideBar";
import Footer from "../components/Footer";
import ProductDetailPresentation from "../components/ProductDetailPresentation";
import "../assets/css/productDetail.css";
import Breadcrumb from "../components/Breadcrum";
import { useParams } from "react-router-dom";

export default function StaffProductDetail() {
  const { name: productName } = useParams();
  return (
    <>
      <StaffHeader />
      <div className="manage-content">
        <StaffSideBar
          role={localStorage.getItem("userRole")}
          customerName={localStorage.getItem("name")}
          customerPoint={localStorage.getItem("point")}
        />
        <div className="manage-content-detail">
          <div className="manage-content-display ">
            <div className="manage-content-product-detail-row-1">
              <ProductDetailPresentation />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
