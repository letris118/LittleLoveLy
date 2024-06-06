import React from 'react';
import '../assets/css/Staff.css'; 
import { routes } from "../routes";
import {Link}from 'react-router-dom' 
//import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

export default function StaffHomePage() {
   
        //const navigate = useNavigate();

        useEffect(() => {
            // Set document title
            document.title = 'Trang Chủ';
    
            // Link Google Font
            const fontLink = document.createElement('link');
            fontLink.href = 'https://fonts.googleapis.com/css2?family=Sevillana&display=swap';
            fontLink.rel = 'stylesheet';
            document.head.appendChild(fontLink);
    
            // Clean up function to remove the font link when the component unmounts
            return () => {
                document.head.removeChild(fontLink);
            };
        }, []);
    

        return (
            <div>                
                <header>
                    {/* logo + store name to return home page */}
                    <div className="store-name">
                        <Link to href={routes.StaffHomePage} style={{ color: '#fff' }}>Little Lovely</Link>
                    </div>

                    {/* search bar + button*/}
                    <div className="search-bar">
                        <input type="text" placeholder="Tìm kiếm sản phẩm..." />
                        <button type="submit">Tìm</button>
                    </div>
                </header>

                {/* navigation bar + home page content*/}
                <div className="content">

                    {/* navigation bar*/}
                    <div className="side-bar">
                        <div className="nav-bar">
                        <Link to={routes.StaffProfile} style={{ color: 'black' }}>Tài Khoản</Link>       
                        <Link to={routes.StaffProfile} style={{ color: 'black' }}>Quản Lý Đơn Hàng</Link>
                        <Link to={routes.StaffProfile} style={{ color: 'black' }}>Quản Lý Sản Phẩm</Link>
                        <Link to={routes.StaffProfile} style={{ color: 'black' }}>Quản Lý Bài Viết</Link>
                        <Link to={routes.StaffProfile} style={{ color: 'black' }}>Quản Lý Voucher</Link>
                        <Link to={routes.StaffProfile} style={{ color: 'black' }}>Chăm Sóc Khách Hàng</Link>
                        <Link to={routes.StaffProfile} style={{ color: 'black' }}>Đăng Xuất</Link>
                        </div>                   
                    </div>

                    <div className="brand-bar">
                    </div>
                    
                   
   

                </div>

            </div>
        );
    }




