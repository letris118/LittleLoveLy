import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import Footer from "../components/Footer";
import ProductDetailPresentation from "../components/ProductDetailPresentation";
import "../assets/css/productDetail.css";
import Breadcrumb from "../components/Breadcrum";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { name: productName } = useParams();
  return (
    <>
      <Header />
      <div className="content">
        <Sidebar
          role={localStorage.getItem("userRole")}
          customerName={localStorage.getItem("username")}
          customerPoint={localStorage.getItem("point")}
        />
        <div className="content-detail">
          <Breadcrumb value={productName} customName="Tất cả sản phẩm" />
          <div className="content-display ">
            <div className="content-row-1">
              <ProductDetailPresentation />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
