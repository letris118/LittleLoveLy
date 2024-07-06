import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../assets/css/saProfile.css";
import StaffHeader from "../components/StaffHeader";
import StaffSideBar from "../components/StaffSideBar";
import { routes } from "../routes";
import {
  getUserInfo,
} from "../services/auth/UsersService";
export default function ProfileCus() {
  const navigate = useNavigate();
  const [staffInfo, setStaffInfo] = useState({});


  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "ROLE_STAFF") {
      navigate(routes.homePage);
    }

    const fetchUser = async () => {
      try {
        const res = await getUserInfo(localStorage.getItem("username"));
        setStaffInfo(res);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();

  }, [navigate]);

  return (
    <div>
      <StaffHeader />
      <div className="manage-content">
        <StaffSideBar />
        <div className="manage-content-detail">
          <div className="sa-profile-content-tbl">
            <div className="sa-row-top">
              Thông tin cá nhân
            </div>
            <div className="sa-profile-content-detail">
              <div className="sa-profile-content-detail-description">
                <div className="sa-profile-content-detail-description-item">
                  <h5>Tên: </h5>
                  <div>{staffInfo.name}</div>
                </div>
                <div className="sa-profile-content-detail-description-item">
                  <h5>Tên tài khoản: </h5>
                  <div>{staffInfo.username}</div>
                </div>
                <div className="sa-profile-content-detail-description-item">
                  <h5>Gmail: </h5>
                  <div>{staffInfo.mail}</div>
                </div>
                <div className="sa-profile-content-detail-description-item">
                  <h5>Số điện thoại: </h5>
                  <div>{staffInfo.phone}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

