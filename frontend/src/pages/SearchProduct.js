import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/SideBar";
import SearchPresentation from "../components/SearchPresentation";

export default function SearchProduct() {
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
