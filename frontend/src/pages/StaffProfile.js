import StaffHeader from "../components/StaffHeader";
import StaffBackToTop from "../components/StaffBackToTop";
import StaffSideBar from "../components/StaffSideBar";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../assets/css/saProfile.css";
import { getUserInfo } from "../services/auth/UsersService";

export default function StaffProfile() {
  const [staffInfo, setStaffInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = () => {
      const userRole = localStorage.getItem("userRole");
      if (!userRole || userRole !== "ROLE_STAFF") {
        navigate("/");
      }
    };
    checkAuthentication();

    // const fetchUser = async () => {
    //   try {
    //     const res = await getUserInfo(localStorage.getItem("username"));
    //     setStaffInfo(res.data);
    //   } catch (error) {
    //     console.error("Error fetching user info:", error);
    //   }
    // };

    // fetchUser();
  }, [navigate]);

  return (
    <div>
      <StaffHeader />
      <div className="manage-content">
        <StaffSideBar />
        <div className="sa-profile-content-tbl">
          <div className="sa-row-top">
            <h4>Thông tin cá nhân</h4>
          </div>
          <div className="sa-profile-content-detail">
            <div className="sa-profile-content-detail-description">
              <div className="sa-profile-content-detail-description-item">
                <h5>Tên tài khoản: </h5>
                <div></div>
              </div>
              <div className="sa-profile-content-detail-description-item">
                <h5>Họ và tên: </h5>
                <div></div>
              </div>
              <div className="sa-profile-content-detail-description-item">
                <h5>Mail: </h5>
                <div>{staffInfo.email}</div>
              </div>
              <div className="sa-profile-content-detail-description-item">
                <h5>Số điện thoại: </h5>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StaffBackToTop />
    </div>
  );
}
