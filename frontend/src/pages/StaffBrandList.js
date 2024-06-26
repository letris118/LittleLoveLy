import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StaffHeader from "../components/StaffHeader";
import { brands } from "../services/auth/UsersService";
import BrandListPresentation from "../components/BrandListPresentation";
import StaffSidebar from "../components/StaffSideBar";

export default function StaffBrandList() {
  const [brandList, setBrandList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {

    const checkAuthentication = () => {
      const userRole = localStorage.getItem("userRole");
      if (!userRole || userRole !== "ROLE_STAFF") {
          navigate('/');
      }
    };
    checkAuthentication();


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
      <StaffHeader />
      <div className="manage-content">
        <StaffSidebar/>

        <div className="manage-content-detail">
          <div className="manage-content-display ">
            <div className="manage-content-row-1">
              <div className="manage-row-1-top" style={{ width: "100%" }}>
                <h4>Tất cả thương hiệu</h4>
              </div>
              <div className="manage-row-list-bottom">
                <BrandListPresentation brands={brandList} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}