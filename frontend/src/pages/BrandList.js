import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { brands, handleLogout, users } from "../services/auth/UsersService";
import BrandListPresentation from "../components/BrandListPresentation";
import Breadcrumb from "../components/Breadcrum";
import Footer from "../components/Footer";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import Sidebar from "../components/SideBar";

export default function BrandList() {
  const [brandList, setBrandList] = useState([]);
  const [customerInfo, setCustomerInfo] = useState([]);
  const navigate = useNavigate();

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
  }, []);

  return (
    <div>
      <Header />
      <div className="content">
        <Sidebar
          role={localStorage.getItem("userRole")}
          customerInfo={customerInfo}
          handleLogout={handleLogout(navigate)}
        />

        <div className="content-detail">
          <Breadcrumb value="Tất cả sản phẩm" />
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
