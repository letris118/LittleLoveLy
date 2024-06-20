import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../routes";

const ManageSidebar = ({role, handleLogout }) => {
    return (

        <div className="Manage-side-bar">

            {/* {role === "ROLE_STAFF" ? (
                <> */}
                    <div className="Manage-nav-bar">
                        <Link to={routes.staffProfile} style={{color:'black'}}>
                            Tài khoản
                        </Link>

                        <Link to={routes.manageOrder} style={{color:'black'}}>
                            Quản lý đơn hàng
                        </Link>

                        <Link to={routes.manageProduct} style={{color:'black'}}>
                            Quản lý sản phẩm
                        </Link>

                        <Link to={routes.manageArticle} style={{color:'black'}}>
                            Quản lý bài viết
                        </Link>

                        <Link to={routes.manageVoucher} style={{color:'black'}}>
                            Quản lý voucher
                        </Link>

                        <Link to="#" style={{color:'black'}}>
                            Chăm sóc khách hàng
                        </Link>

                        <Link onClick={handleLogout} style={{color:'black'}}>
                            Đăng xuất
                        </Link>
                    </div>  
                {/* </>
                ): role === "ROLE_ADMIN" ? (
                <>
                    <div className="staff-nav-bar">
                        <Link to="#">
                            Tài khoản
                        </Link>

                        <Link to="#">
                            Quản lý người dùng
                        </Link>

                        <Link to="#">
                            Thống kê doanh thu
                        </Link>
                
                        <Link onClick={handleLogout}>
                            Đăng xuất
                        </Link>
                    </div>       
                </>
                ): null} */}
            </div>
        );
    };
    
    export default ManageSidebar;

