import React, { useEffect, useMemo, useState } from "react";
import StaffHeader from "../components/StaffHeader";
import Footer from "../components/Footer";
import StaffSideBar from "../components/StaffSideBar";
import SearchPresentation from "../components/SearchPresentation";
import StaffBackToTop from "../components/StaffBackToTop"
export default function StaffSearchProduct() {
  return (
    <div>
      <StaffHeader />
      <div className="manage-content">
        <StaffSideBar
          role={localStorage.getItem("userRole")}
          customerName={localStorage.getItem("name")}
          customerPoint={localStorage.getItem("point")}
        />
        <div className="manage-content-detail">
          <div className="manage-content-display ">
            <div className="manage-content-search-row">
              <SearchPresentation />
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <StaffBackToTop />
    </div>
  );
}
