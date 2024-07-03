import React, { useEffect, useState } from "react";
import StaffHeader from "../components/StaffHeader";
import StaffSideBar from "../components/StaffSideBar";
import { brands } from "../services/auth/UsersService";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../components/Footer";


export default function StaffBrandDetail() {
  const brandName = useParams();
  const [brandInfo, setBrandInfo] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {


    const checkAuthentication = () => {
        const userRole = localStorage.getItem("userRole");
        if (!userRole || userRole !== "ROLE_STAFF") {
            navigate('/');
        }
      };
      checkAuthentication();

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
      <StaffHeader />
      <div className="manage-content">
        <StaffSideBar
          role={localStorage.getItem("userRole")}
          customerName={localStorage.getItem("name")}
          customerPoint={localStorage.getItem("point")}
        />
        <div className="manage-content-detail">
          <div className="manage-content-display ">
            <div className="manage-content-row-1">
              <div className="manage-row-1-left">Ảnh và logo</div>
              <div className="manage-row-1-right">Text</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
