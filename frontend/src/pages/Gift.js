import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import Footer from "../components/Footer";

export default function Gift() {
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
            <div className="content-gift-row"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
