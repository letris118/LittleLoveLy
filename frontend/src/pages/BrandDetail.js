import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/SideBar";
import { brands, handleLogout, users } from "../services/auth/UsersService";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Footer from "../components/Footer";

export default function BrandDetail() {
  const brandName = useParams();
  const [customerInfo, setCustomerInfo] = useState([]);
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

    if (localStorage.getItem("token")) {
      const fetchCustomerInfo = async () => {
        try {
          const token = localStorage.getItem("token");
          const decoded = jwtDecode(token);
          let response = await users();
          if (response) {
            const userInfo = response.find(
              (user) => user.username === decoded.sub
            );
            setCustomerInfo(userInfo);
          } else {
            setCustomerInfo([]);
          }
        } catch (error) {
          console.error("Error fetching customer info:", error);
          toast.error("Không thể tải thông tin khách hang");
        }
      };

      fetchCustomerInfo();
    }

    fetchBrand();
  }, []);
  return (
    <>
      <Header />
      <div className="content">
        <Sidebar
          role={localStorage.getItem("userRole")}
          customerInfo={customerInfo}
          handleLogout={handleLogout(navigate)}
        />
        <div className="content-detail">
          <div className="content-display "></div>
        </div>
      </div>
      <Footer />
    </>
  );
}
