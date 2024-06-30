import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../routes";
import StaffBackToTop from './StaffBackToTop';

export default function AdminSideBar() {
  return (
  
    <div className="manage-side-bar">
        <div className="manage-nav-bar">
            <Link to={routes.statistics} style={{color: 'black'}}>
                Thống kê doanh thu
            </Link>

            <Link to={routes.manageMember} style={{color: 'black'}}>
                Quản lý người dùng
            </Link>

            <Link to={routes.manageStaff} style={{color: 'black'}}>
                Quản Lý nhân viên
            </Link>            
        </div>
        <StaffBackToTop />
    </div>
    
   
  );
}