import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../routes";
import "../assets/css/homePage.css";
import {
  getUsersByRoleAll
} from "../services/auth/UsersService";
import AdminSideBar from "../components/AdminSideBar";
import StaffBackToTop from "../components/StaffBackToTop"

export default function ManageMember() {
  const navigate = useNavigate();

  useEffect(() => {

    const checkAuthentication = () => {
      const userRole = localStorage.getItem("userRole");
      if (!userRole || userRole !== "ROLE_ADMIN") {
        navigate('/');
      }
    };
    checkAuthentication();

  }, []);

  return (
    <div>
      <AdminHeader />

      <div className="manage-content">
        <AdminSideBar />

        <div className="manage-content-detail">
          <div className="search-add-table">
            <div className="table-search-bar">
              <input
                type="text"
                placeholder="Tìm kiếm người dùng..."
                value=""
                onChange=""
              />
            </div>
            <div className="add-product-btn">
              <Link to="#" className="add-product-link">
                Thêm người dùng mới
              </Link>
            </div>
          </div>
          <table className="manage-table">
            <thead className="manage-table-head">
              <tr>
                <th className="index-head" style={{ width: '5%' }}>STT</th>
                <th className="usernam-head" style={{ width: '15%' }}>Tên tài khoản</th>
                <th className="name-head" style={{ width: '19%' }}>Họ và tên</th>
                <th className="mail-head" style={{ width: '18%' }}>Mail</th>
                <th className="phone-head" style={{ width: '16%' }}>Số điện thoại</th>
                <th className="regisDate-head" style={{ width: '16%' }}>Ngày đăng kí</th>
                <th className="detail-head" style={{ width: '10%' }}>Chi tiết</th>
              </tr>
            </thead>

            <tbody className="manage-table-body">

            </tbody>
          </table>
        </div>
      </div>
      <StaffBackToTop />
    </div>
  );
}
